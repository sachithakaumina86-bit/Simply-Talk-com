import React from 'react';
import { ArrowRight, CheckCircle2, Shield, HeartHandshake, Sparkles, Building, Phone, Mail, MapPin } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SITE_COPY } from '../data/siteCopy';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="About Us | Simply Talk"
        description="We help small businesses never miss a customer. Make instant, intelligent customer conversations affordable for every business."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
            About Simply Talk
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            {SITE_COPY.about.headline}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed pt-2">
            {SITE_COPY.about.mission}
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#1F2433]">Our Story</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {SITE_COPY.about.story}
          </p>
          <div className="pt-4 flex items-center gap-4 border-t border-slate-100">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="px-6 py-3 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold text-sm hover:bg-[#10B092] transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#1F2433]">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_COPY.about.values.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3B2FD0] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="text-lg font-bold text-[#1F2433]">{val.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Details Block */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-[#1F2433] mb-4">Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-[#3B2FD0]" />
              <span className="font-semibold text-slate-800">Entity:</span>
              <Placeholder value={PLACEHOLDERS.COMPANY_NAME} />
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#3B2FD0] shrink-0" />
              <span className="font-semibold text-slate-800">Phone:</span>
              <div className="flex flex-wrap items-center gap-x-1.5 text-slate-600">
                <a href="tel:0716460440" className="hover:text-[#3B2FD0] transition-colors">071 646 0440</a>
                <span className="text-slate-400">/</span>
                <a href="tel:0716992185" className="hover:text-[#3B2FD0] transition-colors">071 699 2185</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#3B2FD0]" />
              <span className="font-semibold text-slate-800">Email:</span>
              <Placeholder value={PLACEHOLDERS.EMAIL} />
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#3B2FD0]" />
              <span className="font-semibold text-slate-800">Address:</span>
              <Placeholder value={PLACEHOLDERS.REGISTERED_ADDRESS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
