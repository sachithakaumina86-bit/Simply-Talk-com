import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  X as CloseIcon,
  MessageSquare,
  ShieldCheck,
  Zap,
  Target,
  BookOpen,
  Palette,
  BarChart3,
  UserCheck,
  Globe,
  FileText,
  Clock,
  TrendingUp,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Seo } from '../components/Seo';
import { PhoneMockup } from '../components/PhoneMockup';
import { ThreeJsFrontDeskHero } from '../components/ThreeJsFrontDeskHero';
import { SITE_COPY } from '../data/siteCopy';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from '../components/Placeholder';
import { INDUSTRIES } from '../data/industries';

export const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'whatsapp' | 'threejs'>('whatsapp');

  const openLiveChat = () => {
    window.dispatchEvent(new CustomEvent('simplytalk:open-chat'));
  };

  const getCardIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#14C3A2]" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#14C3A2]" />;
      case 'Target':
        return <Target className="w-6 h-6 text-[#14C3A2]" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-[#14C3A2]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#14C3A2]" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-[#14C3A2]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#14C3A2]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      <Seo
        title="Simply Talk: AI Chatbot for Website and WhatsApp Lead Capture"
        description="Answer customer questions instantly, qualify buyers and capture leads 24/7 on your website and WhatsApp. Start free."
      />

      {/* 4.1 HERO SECTION */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Line (Placeholder only per Section 4.1) */}
              {PLACEHOLDERS.RATING ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-[#3B2FD0]">
                  <span>★ ★ ★ ★ ★</span>
                  <span>{PLACEHOLDERS.RATING}</span>
                </div>
              ) : (
                <div className="inline-block">
                  <Placeholder value="[Rated 4.9/5 by early users]" />
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                <span className="block text-[#1F2433]">{SITE_COPY.hero.headline}</span>
                <span className="block text-[#3B2FD0] mt-1">{SITE_COPY.hero.highlightedLine}</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {SITE_COPY.hero.subtext}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={PLACEHOLDERS.APP_URL}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-extrabold text-base shadow-lg hover:shadow-xl transition-all duration-200 text-center active:scale-98 cursor-pointer"
                >
                  {SITE_COPY.hero.ctaPrimary}
                </a>
                <a
                  href={`https://wa.me/${PLACEHOLDERS.WHATSAPP_DEMO_NUMBER}?text=Hi%20Simply%20Talk!%20I'd%20like%20to%20test%20the%20demo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-indigo-50 font-bold text-base transition-all duration-200 text-center cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <span>{SITE_COPY.hero.ctaSecondary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Reassurance Line (FINAL) */}
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {SITE_COPY.hero.reassurance}
              </p>

              {/* Showcase switcher toggle */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-xs text-slate-400 mr-1">Preview Demo Mode:</span>
                <button
                  onClick={() => setViewMode('whatsapp')}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    viewMode === 'whatsapp'
                      ? 'bg-[#1F2433] text-white shadow-xs'
                      : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70'
                  }`}
                >
                  WhatsApp Live Chat Mockup
                </button>
                <button
                  onClick={() => setViewMode('threejs')}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors cursor-pointer inline-flex items-center gap-1 ${
                    viewMode === 'threejs'
                      ? 'bg-[#3B2FD0] text-white shadow-xs'
                      : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70'
                  }`}
                >
                  <Layers className="w-3 h-3 text-[#14C3A2]" />
                  <span>3D AI Desk Hub (Three.js)</span>
                </button>
              </div>
            </div>

            {/* Right Visual: Phone Mockup or Three.js 3D Hub */}
            <div className="lg:col-span-5 flex justify-center">
              {viewMode === 'whatsapp' ? (
                <PhoneMockup showLeadBadge={true} />
              ) : (
                <div className="w-full">
                  <ThreeJsFrontDeskHero />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 PROBLEM STRIP (Dark Indigo Background) */}
      <section className="bg-[#221a8a] text-white py-14 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {SITE_COPY.problemStrip.headline}
          </h2>
          <p className="text-xl sm:text-2xl text-[#14C3A2] font-semibold">
            {SITE_COPY.problemStrip.subline}
          </p>

          {/* Optional real review slot per 4.2: render nothing if empty */}
          {PLACEHOLDERS.REVIEW_QUOTE && (
            <div className="pt-6 max-w-xl mx-auto text-slate-300 italic text-sm border-t border-indigo-400/30">
              "{PLACEHOLDERS.REVIEW_QUOTE.quote}" — {PLACEHOLDERS.REVIEW_QUOTE.author},{' '}
              {PLACEHOLDERS.REVIEW_QUOTE.business}
            </div>
          )}
        </div>
      </section>

      {/* 4.3 HOW IT WORKS (Up and running in 3 steps) */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.howItWorks.heading}
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              {SITE_COPY.howItWorks.subheading}
            </p>
          </div>

          {/* 3 Step Icons joined by arrows on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {SITE_COPY.howItWorks.steps.map((st, idx) => (
              <div
                key={st.step}
                className="relative bg-[#F7F8FC] rounded-2xl p-8 border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Step Circle with Number Badge */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#3B2FD0] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                    {st.step === 1 && <FileText className="w-8 h-8 text-[#14C3A2]" />}
                    {st.step === 2 && <Zap className="w-8 h-8 text-[#14C3A2]" />}
                    {st.step === 3 && <UserCheck className="w-8 h-8 text-[#14C3A2]" />}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#14C3A2] text-[#1F2433] font-extrabold text-xs flex items-center justify-center ring-2 ring-white">
                    {st.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1F2433] pt-2">{st.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.4 LIVE DEMO (Do not just read about it. Talk to it.) */}
      <section className="py-20 sm:py-24 bg-[#F7F8FC] border-y border-slate-200/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Copy & CTA */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#14C3A2]"></span>
                Live Gemini Chatbot
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
                {SITE_COPY.liveDemo.heading}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {SITE_COPY.liveDemo.text}
              </p>
              <div className="pt-2">
                <button
                  onClick={openLiveChat}
                  className="px-8 py-3.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-bold text-base shadow-md transition-all active:scale-98 cursor-pointer inline-flex items-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>{SITE_COPY.liveDemo.buttonText}</span>
                </button>
              </div>
            </div>

            {/* Visual: Illustration of chat window with pointer */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={openLiveChat}
                className="w-full max-w-[340px] bg-slate-50 border-2 border-dashed border-[#3B2FD0]/40 rounded-2xl p-6 text-center cursor-pointer hover:border-[#3B2FD0] transition-colors relative group"
              >
                <div className="w-16 h-16 rounded-full bg-[#14C3A2] text-[#1F2433] mx-auto flex items-center justify-center shadow-md mb-4 pulse-badge">
                  <MessageSquare className="w-8 h-8 fill-current" />
                </div>
                <h4 className="font-bold text-[#1F2433] text-base">Click to test live demo</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Ask about plans, setup, or tell it your business type.
                </p>
                {/* Pointer icon */}
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#3B2FD0]">
                  <span>Open assistant widget</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 MORE THAN A BASIC CHATBOT (3x2 Grid) */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.moreThanChatbot.heading}
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              {SITE_COPY.moreThanChatbot.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_COPY.moreThanChatbot.cards.map((card) => (
              <div
                key={card.title}
                className="bg-[#F7F8FC] rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-5 shadow-2xs">
                    {getCardIcon(card.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2433] mb-2">{card.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.6 COMPARISON TABLE */}
      <section className="py-20 sm:py-24 bg-[#F7F8FC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.comparison.heading}
            </h2>
          </div>

          {/* Table Container (Horizontally scrollable on mobile) */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-500 w-2/5">Capability</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-500 w-1/5">Contact form</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-500 w-1/5">Manual live chat</th>
                  <th className="py-4 px-6 text-sm font-bold text-[#3B2FD0] bg-teal-50/60 w-1/5 border-l-2 border-[#14C3A2]">
                    Simply Talk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {SITE_COPY.comparison.rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-semibold text-[#1F2433]">{row.feature}</td>
                    <td className="py-4 px-6 text-slate-500 flex items-center gap-2">
                      <CloseIcon className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{row.contactForm}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2">
                        <CloseIcon className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{row.manualChat}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1F2433] bg-teal-50/40 border-l-2 border-[#14C3A2]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#14C3A2] stroke-[3]" />
                        <span>{row.simplyTalk}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4.7 INDUSTRIES (Two-column list) */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.industriesSection.heading}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {SITE_COPY.industriesSection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to={`/solutions/${ind.slug}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[#F7F8FC] border border-slate-200 hover:border-[#3B2FD0] hover:bg-white hover:shadow-sm transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#3B2FD0] flex items-center justify-center font-bold text-xs">
                    {ind.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1F2433] text-sm group-hover:text-[#3B2FD0] transition-colors">
                      {ind.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{ind.shortDescription}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#3B2FD0] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 italic max-w-xl mx-auto">
              {SITE_COPY.industriesSection.closingLine}
            </p>
          </div>
        </div>
      </section>

      {/* 4.8 WHAT IS INCLUDED */}
      <section className="py-20 sm:py-24 bg-[#F7F8FC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.whatIsIncluded.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SITE_COPY.whatIsIncluded.items.map((it) => (
              <div
                key={it.title}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#14C3A2] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2433] text-base mb-1">{it.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.9 PRICING PREVIEW */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2433] tracking-tight">
              {SITE_COPY.pricingPreview.heading}
            </h2>

            {/* Conversation credit explainer box (FINAL) */}
            <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 text-xs text-slate-700 max-w-xl mx-auto text-left flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#3B2FD0] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#3B2FD0] block mb-0.5">What is a Conversation Credit?</span>
                <p>{SITE_COPY.pricingPreview.creditExplainer}</p>
              </div>
            </div>
          </div>

          {/* Four Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1F2433]">Free</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">Try Simply Talk at no cost</p>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-[#1F2433]">$0</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-200/80">
                  <div className="font-semibold text-[#3B2FD0]">50 credits / month</div>
                  <div>1 user</div>
                  <div>Website chatbot</div>
                  <div>Lead capture</div>
                  <div>Knowledge base: <Placeholder value="[TO CONFIRM]" /></div>
                </div>
              </div>
              <a
                href={PLACEHOLDERS.APP_URL}
                className="mt-6 w-full py-2.5 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors"
              >
                Start Free
              </a>
            </div>

            {/* Basic */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1F2433]">Basic</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">For growing businesses</p>
                <div className="my-5">
                  <Placeholder value={PLACEHOLDERS.PRICING.BASIC_MONTHLY} className="text-xl font-bold" />
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-200/80">
                  <div className="font-semibold text-[#3B2FD0]">200 credits / month</div>
                  <div>1 user</div>
                  <div>Website + WhatsApp</div>
                  <div>Lead qualification & capture</div>
                  <div>Website crawls: <Placeholder value="[TO CONFIRM]" /></div>
                </div>
              </div>
              <a
                href={PLACEHOLDERS.APP_URL}
                className="mt-6 w-full py-2.5 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors"
              >
                Choose Basic
              </a>
            </div>

            {/* Team (Most Popular) */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#14C3A2] shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#14C3A2] text-[#1F2433] text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                Most popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1F2433]">Team</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">For busier enquiry desks</p>
                <div className="my-5">
                  <Placeholder value={PLACEHOLDERS.PRICING.TEAM_MONTHLY} className="text-xl font-bold" />
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-200/80">
                  <div className="font-semibold text-[#14C3A2]">1,000 credits / month</div>
                  <div>3 users</div>
                  <div>Website + WhatsApp</div>
                  <div>Advanced lead qualification</div>
                  <div>Custom branding & avatar</div>
                </div>
              </div>
              <a
                href={PLACEHOLDERS.APP_URL}
                className="mt-6 w-full py-2.5 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-extrabold text-xs text-center shadow-md transition-colors"
              >
                Choose Team
              </a>
            </div>

            {/* Enterprise */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1F2433]">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">Scale, flexibility and dedicated support</p>
                <div className="my-5">
                  <Placeholder value={PLACEHOLDERS.PRICING.ENTERPRISE_MONTHLY} className="text-xl font-bold" />
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="space-y-2 text-xs text-slate-700 py-3 border-y border-slate-200/80">
                  <div className="font-semibold text-[#3B2FD0]">3,000+ credits / month</div>
                  <div>10+ users</div>
                  <div>Priority support</div>
                  <div>Custom API webhooks</div>
                  <div>Dedicated account onboarding</div>
                </div>
              </div>
              <a
                href={PLACEHOLDERS.APP_URL}
                className="mt-6 w-full py-2.5 rounded-full border-2 border-[#3B2FD0] text-[#3B2FD0] hover:bg-[#3B2FD0] hover:text-white font-bold text-xs text-center transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/pricing"
              className="text-[#3B2FD0] font-bold text-sm hover:underline inline-flex items-center gap-1.5"
            >
              <span>See full comparison</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.10 FINAL CALL TO ACTION */}
      <section className="py-20 sm:py-24 bg-[#3B2FD0] text-white text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {SITE_COPY.finalCta.heading}
          </h2>
          <p className="text-xl sm:text-2xl text-[#14C3A2] font-bold">
            {SITE_COPY.finalCta.subheading}
          </p>

          <div className="space-y-1 text-slate-200 text-sm sm:text-base font-medium py-2">
            {SITE_COPY.finalCta.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="pt-4">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-[#14C3A2] text-[#1F2433] hover:bg-[#10B092] font-black text-lg shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <span>{SITE_COPY.finalCta.button}</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-indigo-200 pt-2 font-medium">
            {SITE_COPY.finalCta.smallPrint}
          </p>
        </div>
      </section>
    </div>
  );
};
