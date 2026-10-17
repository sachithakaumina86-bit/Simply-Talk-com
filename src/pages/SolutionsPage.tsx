import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Seo } from '../components/Seo';
import { INDUSTRIES } from '../data/industries';
import { PLACEHOLDERS } from '../data/placeholders';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="AI Chatbot Solutions by Industry | Simply Talk"
        description="Whether you need clinic bookings, property enquiry qualification, or salon appointments, discover how Simply Talk adapts to your industry."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
            Tailored Industry Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            Built for businesses that live on customer enquiries
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            Explore how Simply Talk answers frequent questions, qualifies buyer interest, and captures high-intent leads across 12 core service sectors.
          </p>
        </div>

        {/* 12 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              to={`/solutions/${ind.slug}`}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-[#3B2FD0] hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3B2FD0] flex items-center justify-center font-bold text-sm">
                    {ind.name.slice(0, 2).toUpperCase()}
                  </div>
                  {ind.isFullyWritten && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#1F2433] group-hover:text-[#3B2FD0] transition-colors mb-2">
                  {ind.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {ind.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#3B2FD0]">
                <span>View {ind.name} demo</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Closing Line Notice */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-[#1F2433]">Do not see your industry?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Simply Talk learns from your uploaded PDFs, catalogues, and website address, so it works for any business with a website and regular customer inquiries.
          </p>
          <div className="pt-2">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="px-6 py-2.5 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold text-sm hover:bg-[#10B092] transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>Start Free with Custom Content</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
