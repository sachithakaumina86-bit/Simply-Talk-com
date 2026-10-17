import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Seo } from '../components/Seo';
import { FeatureIllustration } from '../components/FeatureIllustration';
import { SITE_COPY } from '../data/siteCopy';
import { PLACEHOLDERS } from '../data/placeholders';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Features | Simply Talk"
        description="Explore everything Simply Talk can do for your business: website chatbot, WhatsApp assistant, lead capture, multilingual replies, and analytics."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            Powerful & Simple
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            {SITE_COPY.featuresPage.headline}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed pt-2">
            {SITE_COPY.featuresPage.subtext}
          </p>
        </div>

        {/* Alternating Image-and-Text Rows */}
        <div className="space-y-16 lg:space-y-24">
          {SITE_COPY.featuresPage.list.map((feat, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={feat.id}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Illustration */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <FeatureIllustration id={feat.id} title={feat.title} />
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase">
                    Feature 0{idx + 1}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2433] tracking-tight">
                    {feat.title}
                  </h2>
                  <p className="text-base sm:text-lg font-medium text-slate-700">
                    {feat.shortDescription}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {feat.details}
                  </p>
                  <div className="pt-2">
                    <a
                      href={PLACEHOLDERS.APP_URL}
                      className="inline-flex items-center gap-2 font-bold text-[#3B2FD0] hover:text-indigo-800 text-sm group"
                    >
                      <span>Try it with free plan</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="bg-[#3B2FD0] text-white rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to turn visitors into buyers?</h2>
          <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto">
            Set up your assistant in under 5 minutes. No coding required.
          </p>
          <div className="pt-2">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="px-8 py-4 rounded-full bg-[#14C3A2] text-[#1F2433] font-black text-base hover:bg-[#10B092] transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>Start Free Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
