import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, LayoutDashboard, HeadphonesIcon, Send } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SITE_COPY } from '../data/siteCopy';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const PartnerProgramPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    clientCount: '1-10',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.company.trim()) errs.company = 'Company name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid work email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const appId = 'app_' + Date.now();

    try {
      // 1. Save to Firestore
      const docRef = doc(db, 'partner_applications', appId);
      await setDoc(docRef, {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        website: formData.website || '',
        clientCount: formData.clientCount,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Firestore partner application write notice:', err);
    }

    console.log('[Partner Application Submitted]', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Partner Program | Simply Talk"
        description="Offer Simply Talk to your clients. Web agencies, marketers and consultants earn recurring commission and manage accounts with priority support."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block (FINAL COPY) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            Agencies & Resellers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            {SITE_COPY.partnerProgram.headline}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            Web agencies, marketers and consultants can resell Simply Talk or refer clients and earn{' '}
            <Placeholder value={PLACEHOLDERS.PARTNER_COMMISSION_RATE} />.
          </p>
        </div>

        {/* 3 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#14C3A2] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2433]">
              Recurring <Placeholder value="[commission]" />
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Earn predictable monthly recurring revenue for every client account that signs up through your custom partner link.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#3B2FD0] flex items-center justify-center font-bold">
              <LayoutDashboard className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2433]">Partner Dashboard</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deploy, brand, and monitor all client chatbot accounts from one centralised agency management hub.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#1F2433] flex items-center justify-center font-bold">
              <HeadphonesIcon className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2433]">Priority Support</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fast-track engineering and technical onboarding assistance for you and your clients whenever you need it.
            </p>
          </div>
        </div>

        {/* Short Application Form */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F2433]">Application Received!</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                Thank you for applying to the Simply Talk Partner Program. Our agency partnerships team will review your application and email your credentials shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left mb-6">
                <h3 className="text-2xl font-extrabold text-[#1F2433]">Apply to Partner</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us a bit about your agency or consultancy to get started.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-indigo-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Sterling"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] bg-slate-50/50"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Agency Name <span className="text-indigo-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Sterling Digital Studio"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] bg-slate-50/50"
                />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Email <span className="text-indigo-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@sterlingdigital.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] bg-slate-50/50"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Agency Website
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://sterlingdigital.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Active Clients
                </label>
                <select
                  value={formData.clientCount}
                  onChange={(e) => setFormData({ ...formData, clientCount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] bg-slate-50/50 cursor-pointer"
                >
                  <option value="1-5">1 – 5 clients</option>
                  <option value="6-20">6 – 20 clients</option>
                  <option value="21-50">21 – 50 clients</option>
                  <option value="50+">50+ clients</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-extrabold text-sm shadow-md transition-all active:scale-98 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Apply to Partner'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
