import React, { useState } from 'react';
import { Sparkles, Brain, Image, Video, Zap, ArrowRight, Play, Loader2, CheckCircle2 } from 'lucide-react';
import { Seo } from '../components/Seo';

export const AiStudioLabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'thinking' | 'image' | 'video'>('thinking');

  // Thinking State
  const [inquiryText, setInquiryText] = useState(
    'We are a dental clinic with 4 doctors. We get about 80 calls a week about emergency extractions, wisdom teeth, and insurance. Can Simply Talk connect to our booking calendar, what does it cost, and does it support Spanish?'
  );
  const [businessType, setBusinessType] = useState('Dental Clinic');
  const [thinkingOutput, setThinkingOutput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState(
    'Minimalist friendly 3D robot avatar for Simply Talk customer service front desk, deep indigo and bright teal highlights, soft studio lighting, high resolution, transparent clean background'
  );
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [imgError, setImgError] = useState('');

  // Video Gen State
  const [videoPrompt, setVideoPrompt] = useState(
    'Cinematic 3D animation of a futuristic holographic speech bubble glowing in teal and deep indigo on a modern office desk'
  );
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [operationName, setOperationName] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Deep Think Handler
  const handleDeepThink = async () => {
    setIsThinking(true);
    setThinkingOutput('');
    try {
      const res = await fetch('/api/deep-think', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry: inquiryText, businessType }),
      });
      const data = await res.json();
      setThinkingOutput(data.analysis || 'Analysis complete.');
    } catch (err: any) {
      setThinkingOutput('Deep thinking reasoning failed: ' + err.message);
    } finally {
      setIsThinking(false);
    }
  };

  // Image Gen Handler
  const handleGenerateImage = async () => {
    setIsGeneratingImg(true);
    setImgError('');
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: imagePrompt, imageSize }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImg(data.imageUrl);
      } else {
        setImgError(data.error || 'Failed to generate image.');
      }
    } catch (err: any) {
      setImgError(err.message || 'Image generation error');
    } finally {
      setIsGeneratingImg(false);
    }
  };

  // Video Gen Handler
  const handleGenerateVideo = async () => {
    setIsGeneratingVideo(true);
    setVideoStatus('Initiating Veo video generation job...');
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: videoPrompt, aspectRatio: videoAspect }),
      });
      const data = await res.json();
      if (data.operationName) {
        setOperationName(data.operationName);
        setVideoStatus(`Job launched: ${data.operationName}. Polling progress...`);
      } else {
        setVideoStatus('Error: ' + (data.error || 'Could not start generation'));
      }
    } catch (err: any) {
      setVideoStatus('Video generation error: ' + err.message);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="AI Intelligence Lab | Simply Talk"
        description="Experience Simply Talk's next-generation AI features powered by Gemini 4 Argon, Gemini 3 Pro, and Veo."
      />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#14C3A2]" />
            <span>AI Technology Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433]">
            Simply Talk Multimodal AI Lab
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Test our deep reasoning qualification engine, high-res avatar generation, and video animation models in one interactive playground.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('thinking')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
              activeTab === 'thinking' ? 'bg-white text-[#3B2FD0] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4 text-[#14C3A2]" />
            <span>High Thinking (Argon)</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
              activeTab === 'image' ? 'bg-white text-[#3B2FD0] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Image className="w-4 h-4 text-[#14C3A2]" />
            <span>High-Res Avatar</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
              activeTab === 'video' ? 'bg-white text-[#3B2FD0] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4 text-[#14C3A2]" />
            <span>Veo Video</span>
          </button>
        </div>

        {/* Tab 1: High Thinking Mode (gemini-4-argon with thinkingLevel: HIGH) */}
        {activeTab === 'thinking' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1F2433] flex items-center gap-2">
                  <span>Deep Reasoning Qualification Engine</span>
                  <span className="text-[10px] font-mono bg-indigo-50 text-[#3B2FD0] px-2 py-0.5 rounded-full">
                    gemini-4-argon
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Uses high-level cognitive reasoning to parse subtle buyer intentions, estimate lead scores, and generate objection-proof responses.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Vertical</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Simulated Customer Inquiry</label>
                <textarea
                  rows={4}
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:ring-2 focus:ring-[#3B2FD0]"
                />
              </div>

              <button
                onClick={handleDeepThink}
                disabled={isThinking}
                className="px-6 py-2.5 rounded-full bg-[#3B2FD0] text-white hover:bg-indigo-700 font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4 text-[#14C3A2]" />}
                <span>{isThinking ? 'Analyzing with High Thinking...' : 'Analyze with Gemini 4 Argon'}</span>
              </button>
            </div>

            {thinkingOutput && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cognitive Qualification Analysis:</span>
                </div>
                <div className="text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed">
                  {thinkingOutput}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: High Quality Image Generation (gemini-3-pro-image-preview with 1K, 2K, 4K) */}
        {activeTab === 'image' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1F2433] flex items-center gap-2">
                <span>Branded Bot Avatar Generator</span>
                <span className="text-[10px] font-mono bg-teal-50 text-emerald-800 px-2 py-0.5 rounded-full">
                  gemini-3-pro-image-preview
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Generate high-fidelity branded mascot avatars and marketing visuals at 1K, 2K, or 4K resolution.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Avatar & Visual Prompt</label>
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:ring-2 focus:ring-[#3B2FD0]"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Resolution Size:</span>
                {(['1K', '2K', '4K'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setImageSize(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      imageSize === size ? 'bg-[#14C3A2] text-[#1F2433]' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImg}
                className="px-6 py-2.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-black text-xs shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingImg ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
                <span>{isGeneratingImg ? 'Rendering in Pro Quality...' : `Generate ${imageSize} Avatar`}</span>
              </button>

              {imgError && <p className="text-xs text-red-500">{imgError}</p>}

              {generatedImg && (
                <div className="mt-4 p-4 border border-slate-200 rounded-2xl flex justify-center bg-slate-50">
                  <img
                    src={generatedImg}
                    alt="Generated Avatar"
                    className="max-h-80 rounded-xl shadow-md object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Veo Video Generation (veo-3.1-fast-generate-preview) */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#1F2433] flex items-center gap-2">
                <span>Veo Video Animation Generator</span>
                <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                  veo-3.1-fast-generate-preview
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Create promotional video graphics in 16:9 (landscape) or 9:16 (portrait) format.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Animation Prompt</label>
                <textarea
                  rows={3}
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:ring-2 focus:ring-[#3B2FD0]"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Aspect Ratio:</span>
                {(['16:9', '9:16'] as const).map((aspect) => (
                  <button
                    key={aspect}
                    type="button"
                    onClick={() => setVideoAspect(aspect)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                      videoAspect === aspect ? 'bg-[#3B2FD0] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {aspect === '16:9' ? '16:9 (Landscape)' : '9:16 (Portrait / Reel)'}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
                className="px-6 py-2.5 rounded-full bg-[#3B2FD0] text-white hover:bg-indigo-700 font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 text-[#14C3A2]" />}
                <span>{isGeneratingVideo ? 'Starting Job...' : 'Generate Veo Preview'}</span>
              </button>

              {videoStatus && (
                <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-700 font-mono border border-slate-200">
                  {videoStatus}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
