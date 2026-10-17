import React, { useState } from 'react';
import { Check, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Zap } from 'lucide-react';
import { Seo } from '../components/Seo';
import { SITE_COPY } from '../data/siteCopy';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';

export const PricingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const detailedComparison = [
    {
      category: 'Usage & Capacity',
      items: [
        { name: 'Monthly conversation credits', free: '50', basic: '200', team: '1,000', enterprise: '3,000+' },
        { name: 'Team user seats', free: '1', basic: '1', team: '3', enterprise: '10+' },
        { name: 'Website crawls', free: '[TO CONFIRM]', basic: '[TO CONFIRM]', team: '[TO CONFIRM]', enterprise: 'Unlimited' },
        { name: 'PDF & file uploads', free: '[TO CONFIRM]', basic: '[TO CONFIRM]', team: '[TO CONFIRM]', enterprise: 'Custom' },
      ],
    },
    {
      category: 'Channels & Integrations',
      items: [
        { name: 'Website chatbot widget', free: true, basic: true, team: true, enterprise: true },
        { name: 'WhatsApp Business integration', free: false, basic: true, team: true, enterprise: true },
        { name: 'Custom brand colours & logo', free: false, basic: true, team: true, enterprise: true },
        { name: 'Multilingual language detection', free: true, basic: true, team: true, enterprise: true },
        { name: 'Webhooks & API access', free: false, basic: false, team: '[TO CONFIRM]', enterprise: true },
      ],
    },
    {
      category: 'Leads & Intelligence',
      items: [
        { name: 'Automatic lead capture (Name, Phone, Email)', free: true, basic: true, team: true, enterprise: true },
        { name: 'Lead qualification scoring', free: false, basic: true, team: true, enterprise: true },
        { name: 'Searchable conversation logs', free: '7 days', basic: '30 days', team: '90 days', enterprise: 'Unlimited' },
        { name: 'Human agent handover alerts', free: false, basic: true, team: true, enterprise: true },
      ],
    },
    {
      category: 'Support & Security',
      items: [
        { name: 'Community & email support', free: true, basic: true, team: true, enterprise: true },
        { name: 'Priority technical support', free: false, basic: false, team: true, enterprise: true },
        { name: 'Dedicated onboarding specialist', free: false, basic: false, team: false, enterprise: true },
        { name: 'Custom SLA agreements', free: false, basic: false, team: false, enterprise: true },
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Pricing | Simply Talk"
        description="Simple, honest pricing. Start on our Free plan with 50 monthly credits. Upgrade as your buyer enquiry volume expands."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
            Plans & Credits
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            Simple pricing. Start free, upgrade when you grow.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            No credit card needed. Get your front desk assistant live in about 5 minutes.
          </p>

          {/* Monthly / Yearly Toggle (Controlled by config flag YEARLY_PRICING_ENABLED) */}
          {PLACEHOLDERS.YEARLY_PRICING_ENABLED && (
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-[#3B2FD0] rounded-full p-1 transition-colors cursor-pointer"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : ''
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                Yearly <span className="text-xs text-[#14C3A2] font-bold">(Save 20%)</span>
              </span>
            </div>
          )}

          {/* Credit Explainer Box (FINAL) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 text-sm text-slate-700 max-w-xl mx-auto text-left shadow-xs flex items-start gap-3 mt-6">
            <Zap className="w-5 h-5 text-[#3B2FD0] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#3B2FD0] block mb-1">What is a Conversation Credit?</span>
              <p className="text-slate-600 text-xs sm:text-sm">{SITE_COPY.pricingPreview.creditExplainer}</p>
            </div>
          </div>
        </div>

        {/* Four Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#1F2433]">Free</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[34px]">Try Simply Talk at no cost</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-[#1F2433]">$0</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 py-4 border-y border-slate-100">
                <li className="font-bold text-[#3B2FD0] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>50 credits / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>1 user seat</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Website chatbot</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Lead capture form</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Knowledge: <Placeholder value="[TO CONFIRM]" /></span>
                </li>
              </ul>
            </div>
            <a
              href={PLACEHOLDERS.APP_URL}
              className="mt-6 w-full py-3 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors block cursor-pointer"
            >
              Start Free
            </a>
          </div>

          {/* Basic */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#1F2433]">Basic</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[34px]">For growing businesses</p>
              <div className="my-6">
                <Placeholder value={PLACEHOLDERS.PRICING.BASIC_MONTHLY} className="text-2xl font-bold" />
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 py-4 border-y border-slate-100">
                <li className="font-bold text-[#3B2FD0] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>200 credits / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>1 user seat</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Website + WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Lead qualification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Website crawls: <Placeholder value="[TO CONFIRM]" /></span>
                </li>
              </ul>
            </div>
            <a
              href={PLACEHOLDERS.APP_URL}
              className="mt-6 w-full py-3 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors block cursor-pointer"
            >
              Choose Basic
            </a>
          </div>

          {/* Team (Most Popular) */}
          <div className="bg-white rounded-3xl p-7 border-2 border-[#14C3A2] shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#14C3A2] text-[#1F2433] text-xs font-black uppercase tracking-wider shadow-sm">
              Most popular
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1F2433]">Team</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[34px]">For busier enquiry desks</p>
              <div className="my-6">
                <Placeholder value={PLACEHOLDERS.PRICING.TEAM_MONTHLY} className="text-2xl font-bold" />
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 py-4 border-y border-slate-100">
                <li className="font-bold text-[#14C3A2] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>1,000 credits / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>3 user seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Website + WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Advanced qualification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Custom branding & avatar</span>
                </li>
              </ul>
            </div>
            <a
              href={PLACEHOLDERS.APP_URL}
              className="mt-6 w-full py-3 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-black text-xs text-center shadow-md transition-colors block cursor-pointer"
            >
              Choose Team
            </a>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#1F2433]">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[34px]">Scale, flexibility and dedicated support</p>
              <div className="my-6">
                <Placeholder value={PLACEHOLDERS.PRICING.ENTERPRISE_MONTHLY} className="text-2xl font-bold" />
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 py-4 border-y border-slate-100">
                <li className="font-bold text-[#3B2FD0] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>3,000+ credits / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>10+ user seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Priority 24/7 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Custom API & CRM webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                  <span>Dedicated onboarding</span>
                </li>
              </ul>
            </div>
            <a
              href={PLACEHOLDERS.APP_URL}
              className="mt-6 w-full py-3 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors block cursor-pointer"
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="space-y-8 pt-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#1F2433]">Compare Full Plan Specifications</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-slate-700 w-2/5">Features & Limits</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-700 text-center w-[15%]">Free</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-700 text-center w-[15%]">Basic</th>
                  <th className="py-4 px-4 text-xs font-bold text-[#14C3A2] bg-teal-50/60 text-center w-[15%]">Team</th>
                  <th className="py-4 px-4 text-xs font-bold text-slate-700 text-center w-[15%]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {detailedComparison.map((cat) => (
                  <React.Fragment key={cat.category}>
                    <tr className="bg-slate-50/80">
                      <td colSpan={5} className="py-3 px-6 font-bold text-xs text-slate-500 uppercase tracking-wider">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((row) => (
                      <tr key={row.name} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-6 font-medium text-slate-800">{row.name}</td>
                        <td className="py-3.5 px-4 text-center text-slate-600">
                          {typeof row.free === 'boolean' ? (
                            row.free ? <Check className="w-4 h-4 text-[#14C3A2] stroke-[3] mx-auto" /> : <span className="text-slate-300">—</span>
                          ) : (
                            <Placeholder value={row.free} />
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600">
                          {typeof row.basic === 'boolean' ? (
                            row.basic ? <Check className="w-4 h-4 text-[#14C3A2] stroke-[3] mx-auto" /> : <span className="text-slate-300">—</span>
                          ) : (
                            <Placeholder value={row.basic} />
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-[#1F2433] bg-teal-50/30">
                          {typeof row.team === 'boolean' ? (
                            row.team ? <Check className="w-4 h-4 text-[#14C3A2] stroke-[3] mx-auto" /> : <span className="text-slate-300">—</span>
                          ) : (
                            <Placeholder value={row.team} />
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? <Check className="w-4 h-4 text-[#14C3A2] stroke-[3] mx-auto" /> : <span className="text-slate-300">—</span>
                          ) : (
                            <Placeholder value={row.enterprise} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Accessible FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6 pt-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-[#1F2433]">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Clear, honest answers to help you choose the right plan.</p>
          </div>

          <div className="space-y-3">
            {SITE_COPY.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-base text-[#1F2433] hover:text-[#3B2FD0] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
