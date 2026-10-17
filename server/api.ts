import { GoogleGenAI, ThinkingLevel, GenerateVideosOperation } from '@google/genai';
import type { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';

dotenv.config();

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

function readJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = req.url || '';

  // 1. Chat endpoint with low-latency gemini-3.1-flash-lite
  if (url === '/api/chat' && req.method === 'POST') {
    try {
      const { message, history } = await readJsonBody(req);
      if (!message) {
        sendJson(res, 400, { error: 'Message is required' });
        return true;
      }

      if (!ai) {
        // Mock fallback if no API key configured
        const fallback = getMockChatResponse(message);
        sendJson(res, 200, { text: fallback, model: 'mock-fallback' });
        return true;
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
      sendJson(res, 200, { text, model: 'gemini-3.1-flash-lite' });
      return true;
    } catch (err: any) {
      console.error('Chat API error:', err);
      // Graceful fallback to mock response if Gemini fails
      const fallback = getMockChatResponse('hello');
      sendJson(res, 200, { text: fallback, model: 'mock-fallback', note: err.message });
      return true;
    }
  }

  // 2. High Thinking Lead Analysis endpoint with gemini-4-argon (ThinkingLevel.HIGH)
  if (url === '/api/deep-think' && req.method === 'POST') {
    try {
      const { inquiry, businessType } = await readJsonBody(req);
      if (!inquiry) {
        sendJson(res, 400, { error: 'Inquiry text is required' });
        return true;
      }

      if (!ai) {
        sendJson(res, 200, {
          analysis: 'Intent: High (Estimated 85/100). The prospect is asking about service pricing and scheduling. Recommended action: Prompt for phone number and offer a 15-minute consultation.',
          leadScore: 85,
          recommendedReply: 'We would love to help you with that! Our consultations are free. What is the best phone number to reach you on?',
          model: 'mock-reasoning',
        });
        return true;
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

      sendJson(res, 200, {
        analysis: response.text,
        model: 'gemini-4-argon',
      });
      return true;
    } catch (err: any) {
      console.error('Deep think error:', err);
      sendJson(res, 500, { error: err.message || 'Deep thinking failed' });
      return true;
    }
  }

  // 3. High quality image generation with gemini-3-pro-image-preview
  if (url === '/api/generate-image' && req.method === 'POST') {
    try {
      const { prompt, imageSize, aspectRatio } = await readJsonBody(req);
      if (!prompt) {
        sendJson(res, 400, { error: 'Prompt is required' });
        return true;
      }

      if (!ai) {
        sendJson(res, 400, { error: 'Gemini API key is not configured' });
        return true;
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

      sendJson(res, 200, { imageUrl, model: 'gemini-3-pro-image-preview' });
      return true;
    } catch (err: any) {
      console.error('Image generation error:', err);
      sendJson(res, 500, { error: err.message || 'Image generation failed' });
      return true;
    }
  }

  // 4. Veo Video Generation with veo-3.1-fast-generate-preview
  if (url === '/api/generate-video' && req.method === 'POST') {
    try {
      const { prompt, imageBytes, mimeType, aspectRatio } = await readJsonBody(req);
      if (!ai) {
        sendJson(res, 400, { error: 'Gemini API key not configured' });
        return true;
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

      sendJson(res, 200, { operationName: operation.name });
      return true;
    } catch (err: any) {
      console.error('Video generation error:', err);
      sendJson(res, 500, { error: err.message || 'Video generation failed' });
      return true;
    }
  }

  // 5. Video status check
  if (url === '/api/video-status' && req.method === 'POST') {
    try {
      const { operationName } = await readJsonBody(req);
      if (!ai || !operationName) {
        sendJson(res, 400, { error: 'Operation name is required' });
        return true;
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      sendJson(res, 200, { done: updated.done, response: updated.response });
      return true;
    } catch (err: any) {
      console.error('Video status error:', err);
      sendJson(res, 500, { error: err.message });
      return true;
    }
  }

  return false;
}

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
