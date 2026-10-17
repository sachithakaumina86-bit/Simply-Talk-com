import React from 'react';
import { Seo } from '../components/Seo';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Privacy Policy | Simply Talk"
        description="Privacy policy and data protection terms for Simply Talk users and website visitors."
      />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Owner / Legal Placeholder
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433]">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xs space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">1. Information We Collect</h2>
            <p>
              When visitors interact with Simply Talk on behalf of <Placeholder value={PLACEHOLDERS.COMPANY_NAME} />, we collect basic contact details provided voluntarily during conversational qualification, including name, phone number, work email, and chat logs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">2. How We Use Collected Data</h2>
            <p>
              Information collected is used strictly to respond to customer inquiries, qualify prospective business requests, and provide customer support. <Placeholder value="[DATA RETENTION & THIRD-PARTY SHARING TERMS TO CONFIRM BY LEGAL COUNSEL]" />
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">3. Security and Storage</h2>
            <p>
              Lead records are stored using industry-standard cloud encryption in Firestore and internal data stores. Access is restricted to authenticated company personnel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#1F2433]">4. Contact Our Privacy Officer</h2>
            <p>
              For data access, correction, or deletion requests, please contact us at{' '}
              <Placeholder value={PLACEHOLDERS.EMAIL} />.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
