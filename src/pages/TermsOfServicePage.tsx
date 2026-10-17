import React from 'react';
import { Seo } from '../components/Seo';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Terms of Service | Simply Talk"
        description="Terms of service and subscription agreement for Simply Talk."
      />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Owner / Legal Placeholder
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433]">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">1. Acceptance of Terms</h2>
            <p>
              By signing up for or using the Simply Talk service provided by{' '}
              <Placeholder value={PLACEHOLDERS.COMPANY_NAME} />, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">2. Conversation Credits & Plans</h2>
            <p>
              A conversation credit is used each time Simply Talk successfully handles a customer conversation. Unused monthly credits do not roll over unless otherwise specified. <Placeholder value="[BILLING CYCLE & CREDIT TOP-UP TERMS TO CONFIRM]" />
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">3. Prohibited Content and Misuse</h2>
            <p>
              Users may not upload illegal, defamatory, or infringing content to the bot knowledge base. The bot is an assistant tool and does not provide certified legal, medical, or emergency advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">4. Contact & Governing Law</h2>
            <p>
              Questions regarding these Terms should be directed to{' '}
              <Placeholder value={PLACEHOLDERS.EMAIL} />. Governing jurisdiction:{' '}
              <Placeholder value="[GOVERNING JURISDICTION TO CONFIRM]" />.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
