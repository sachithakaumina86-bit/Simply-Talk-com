import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Body parser
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are the Simply Talk assistant on the Simply Talk website.
Answer ONLY from the Simply Talk knowledge base below. Never invent features, prices, integrations, statistics, customers or reviews.
Keep every reply under 60 words and ask only ONE question at a time.
Be friendly, clear and confident. Use short sentences and no jargon. Speak to the visitor as "you".
Reply in the language the visitor uses.
When you are unsure or the answer is not in the knowledge base, say so honestly and offer a human follow-up instead of guessing.
When the visitor shows buying interest (asks about pricing, setup, plans or a demo) for 2-3 messages, politely ask for their name, then phone, then email, one at a time. After you have all three, reply: "Thanks, our team will be in touch."
If the visitor asks for a person, offer the "Talk to a person" handover.
For plan prices that are not in the knowledge base, say pricing is being finalised and offer to take their details.

KNOWLEDGE BASE:
- Simply Talk is an AI chatbot for websites and WhatsApp that answers customer questions, qualifies buyers and captures contact details 24/7.
- It is for small and medium businesses with a website and steady enquiries: clinics, salons, tuition centres, restaurants, property agents, law and accounting firms, car dealers, online shops.
- Core promise: answer instantly, qualify automatically, capture every lead.
- Setup in 3 steps: (1) teach it your business by uploading PDFs, brochures, price lists or pasting your website address; (2) add one line of code to your site or connect your WhatsApp Business number; (3) collect ready-to-buy leads in your dashboard and inbox.
- Features: website chatbot, WhatsApp assistant, knowledge training, lead qualification, lead capture, multilingual replies, brand customisation (colours, logo, tone, welcome message, avatar), conversation analytics, human handover, team access on higher plans.
- Plans: Free ($0, 50 credits/month, 1 user); Basic (200 credits, 1 user); Team (1,000 credits, 3 users, most popular); Enterprise (3,000+ credits, 10+ users, dedicated support). Paid prices are to be confirmed.
- A conversation credit is used each time Simply Talk successfully handles a customer conversation. Credits reset at the start of every billing cycle.
- Free plan available, no credit card needed, live in about 5 minutes.
- Partner Program: agencies, marketers and consultants can resell or refer Simply Talk and earn recurring commission (rate to be confirmed).`;

function getMockChatResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('cost') || m.includes('price') || m.includes('plan')) {
    return 'Simply Talk starts with a 100% Free plan (50 credits/month). Paid plans (Basic, Team, and Enterprise) are being finalised. What is your name so we can keep you updated?';
  }
  if (m.includes('work') || m.includes('how')) {
    return 'Simply Talk reads your website address or uploaded PDFs, then answers customer questions and captures lead details automatically 24/7. Which industry is your business in?';
  }
  if (m.includes('whatsapp')) {
    return 'Yes! Simply Talk connects directly to your WhatsApp Business number. Customers get instant replies day and night. Would you like to test a WhatsApp demo?';
  }
  if (m.includes('person') || m.includes('human')) {
    return 'I would be happy to connect you with our team! Please provide your phone number and email, and someone will reach out shortly.';
  }
  return 'Simply Talk is your AI front desk that talks to every visitor, answers FAQs, and captures ready-to-buy leads 24/7. Would you like to start a free trial?';
}

// 1. Chat endpoint with low-latency gemini-3.1-flash-lite
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      const fallback = getMockChatResponse(message);
      return res.json({ text: fallback, model: 'mock-fallback' });
    }

    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });

    const text = response.text || 'Thanks for reaching out! How can I help you today?';
    return res.json({ text, model: 'gemini-3.1-flash-lite' });
  } catch (err: any) {
    console.error('Chat API error:', err);
    const fallback = getMockChatResponse(req.body.message || 'hello');
    return res.json({ text: fallback, model: 'mock-fallback', note: err.message });
  }
});

// 2. High Thinking Lead Analysis endpoint with gemini-4-argon (ThinkingLevel.HIGH)
app.post('/api/deep-think', async (req, res) => {
  try {
    const { inquiry, businessType } = req.body;
    if (!inquiry) {
      return res.status(400).json({ error: 'Inquiry text is required' });
    }

    if (!ai) {
      return res.json({
        analysis:
          'Intent: High (Estimated 85/100). The prospect is asking about service pricing and scheduling. Recommended action: Prompt for phone number and offer a 15-minute consultation.',
        leadScore: 85,
        recommendedReply:
          'We would love to help you with that! Our consultations are free. What is the best phone number to reach you on?',
        model: 'mock-reasoning',
      });
    }

    const prompt = `Analyze this customer inquiry for a ${businessType || 'local business'}:
"${inquiry}"

Evaluate:
1. Buyer intent score (0-100)
2. Immediate customer urgency and specific needs
3. Potential objections or hesitation
4. Ideal 1-sentence qualifying question to collect contact details.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return res.json({
      analysis: response.text,
      model: 'gemini-4-argon',
    });
  } catch (err: any) {
    console.error('Deep think error:', err);
    return res.status(500).json({ error: err.message || 'Deep thinking failed' });
  }
});

// 3. High quality image generation with gemini-3-pro-image-preview
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, imageSize, aspectRatio } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      return res.status(400).json({ error: 'Gemini API key is not configured' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: imageSize === '4K' ? '4K' : imageSize === '2K' ? '2K' : '1K',
          aspectRatio: (aspectRatio as any) || '1:1',
        },
      },
    });

    let imageUrl = '';
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    return res.json({ imageUrl, model: 'gemini-3-pro-image-preview' });
  } catch (err: any) {
    console.error('Image generation error:', err);
    return res.status(500).json({ error: err.message || 'Image generation failed' });
  }
});

// 4. Veo Video Generation with veo-3.1-fast-generate-preview
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt, imageBytes, mimeType, aspectRatio } = req.body;
    if (!ai) {
      return res.status(400).json({ error: 'Gemini API key not configured' });
    }

    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Professional 3D motion graphic preview of an AI customer chatbot',
      image: imageBytes
        ? {
            imageBytes,
            mimeType: mimeType || 'image/png',
          }
        : undefined,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio === '9:16' ? '9:16' : '16:9',
      },
    });

    return res.json({ operationName: operation.name });
  } catch (err: any) {
    console.error('Video generation error:', err);
    return res.status(500).json({ error: err.message || 'Video generation failed' });
  }
});

// 5. Video status check
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!ai || !operationName) {
      return res.status(400).json({ error: 'Operation name is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    return res.json({ done: updated.done, response: updated.response });
  } catch (err: any) {
    console.error('Video status error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Mount Vite middleware in development or serve static build in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Simply Talk server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
