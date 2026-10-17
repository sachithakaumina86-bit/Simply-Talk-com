import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { Seo } from '../components/Seo';
import { INDUSTRIES } from '../data/industries';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';

export const IndustryDetailPage: React.FC = () => {
  const { industry } = useParams<{ industry: string }>();
  const data = INDUSTRIES.find((ind) => ind.slug === industry);

  if (!data) {
    return <Navigate to="/solutions" replace />;
  }

  const whatsappUrl = `https://wa.me/${PLACEHOLDERS.WHATSAPP_DEMO_NUMBER}?text=Hi%20Simply%20Talk!%20I'm%20interested%20in%20the%20${encodeURIComponent(
    data.name
  )}%20assistant%20solution.`;

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title={`${data.headline} | Simply Talk`}
        description={data.problemLine}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Back Link */}
        <div>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#3B2FD0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Solutions</span>
          </Link>
        </div>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
              <span>Solution for {data.name}</span>
              {!data.isFullyWritten && (
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  Owner Review
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight leading-tight">
              {data.headline}
            </h1>

            <p className="text-xl font-medium text-[#3B2FD0]">
              {data.problemLine}
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Simply Talk is trained on your exact service menu, appointment guidelines, and FAQs to reply in seconds, qualify serious buyers, and pass high-value bookings straight to your team.
            </p>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] text-white hover:bg-emerald-600 font-bold text-sm shadow-md transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Try WhatsApp Demo</span>
              </a>
              <a
                href={PLACEHOLDERS.APP_URL}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-bold text-sm shadow-md transition-all text-center inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-slate-500">
              Free plan available · No credit card needed · Ready in ~5 minutes
            </p>
          </div>

          {/* Right Phone Mockup showing Industry Example Conversation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] rounded-[36px] bg-[#1F2433] p-3 shadow-2xl">
              <div className="rounded-[28px] overflow-hidden bg-[#ECE5DD] pt-6 pb-3 flex flex-col h-[460px] shadow-inner text-xs">
                {/* Header */}
                <div className="bg-[#075E54] text-white px-3.5 py-2 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold flex items-center justify-center text-xs">
                      ST
                    </div>
                    <div>
                      <div className="font-semibold text-xs leading-none">Simply Talk</div>
                      <div className="text-[10px] text-emerald-200">{data.name} Desk</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-700/60 px-2 py-0.5 rounded-full">24/7 Live</span>
                </div>

                {/* Conversation Stream */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {data.sampleChat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-2.5 shadow-2xs leading-relaxed ${
                          msg.sender === 'customer'
                            ? 'bg-[#E7FFDB] text-slate-800 rounded-tr-xs'
                            : 'bg-white text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="block text-[9px] text-slate-400 text-right mt-1">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Input mockup */}
                <div className="px-3 pt-2 pb-1 bg-[#F0F2F5] border-t border-slate-200 text-slate-400 text-[11px] rounded-full mx-2 flex items-center justify-between">
                  <span>Type a reply...</span>
                  <div className="w-5 h-5 rounded-full bg-[#128C7E] flex items-center justify-center text-white">
                    <span className="text-[9px]">➔</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Industry-Specific Benefits */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-[#1F2433]">
              Why {data.name} choose Simply Talk
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Three key benefits designed specifically for your daily client workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#14C3A2] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2433]">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
