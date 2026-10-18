import React from 'react';
import { CheckCheck } from 'lucide-react';

interface PhoneMockupProps {
  className?: string;
  showLeadBadge?: boolean;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  className = '',
  showLeadBadge = true,
}) => {
  return (
    <div className={`relative mx-auto max-w-[340px] ${className}`}>
      {/* Outer Phone Shell */}
      <div className="relative rounded-[40px] bg-[#1F2433] p-3.5 shadow-2xl ring-1 ring-slate-900/10">
        {/* Notch / Speaker Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Screen Frame */}
        <div className="relative rounded-[30px] overflow-hidden bg-[#E5DDD5] pt-9 pb-4 flex flex-col h-[520px] shadow-inner select-none">
          {/* WhatsApp Brand Header */}
          <div className="bg-[#075E54] text-white px-3.5 py-2.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpeg"
                alt="SimplyTalk"
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="w-9 h-9 rounded-full object-cover shadow-xs ring-1 ring-white/30"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-tight">Simply Talk Assistant</span>
                <span className="text-[11px] text-emerald-200">Online 24/7 · Business</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-[#14C3A2]"></span>
              <span>Active</span>
            </div>
          </div>

          {/* Chat Background Pattern & Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs font-sans">
            {/* Timestamp Notice */}
            <div className="text-center my-1">
              <span className="bg-white/80 backdrop-blur-xs text-slate-500 text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">
                Today, 11:24 PM (After Hours)
              </span>
            </div>

            {/* Customer Message 1 */}
            <div className="flex justify-end">
              <div className="bg-[#E7FFDB] text-slate-800 rounded-2xl rounded-tr-xs p-2.5 max-w-[82%] shadow-2xs">
                <p>Hi, do you have any appointments available this weekend for a consultation?</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:24 PM</span>
                  <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                </div>
              </div>
            </div>

            {/* Bot Message 1 */}
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs p-2.5 max-w-[85%] shadow-2xs">
                <p>Hello! Yes, we have slots open this Saturday at 11:00 AM and 2:30 PM. Would either of those suit you?</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:24 PM</span>
                </div>
              </div>
            </div>

            {/* Customer Message 2 */}
            <div className="flex justify-end">
              <div className="bg-[#E7FFDB] text-slate-800 rounded-2xl rounded-tr-xs p-2.5 max-w-[82%] shadow-2xs">
                <p>Saturday at 11:00 AM works perfectly! How much is the first session?</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:25 PM</span>
                  <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                </div>
              </div>
            </div>

            {/* Bot Message 2 */}
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs p-2.5 max-w-[85%] shadow-2xs">
                <p>Our initial consultation is completely free. What is your full name and best phone number so we can hold the 11:00 AM slot for you?</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:25 PM</span>
                </div>
              </div>
            </div>

            {/* Customer Message 3 (Lead Details) */}
            <div className="flex justify-end">
              <div className="bg-[#E7FFDB] text-slate-800 rounded-2xl rounded-tr-xs p-2.5 max-w-[82%] shadow-2xs">
                <p>Elena Vance, 555-019-8834, elena@vance.com.</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:26 PM</span>
                  <CheckCheck className="w-3 h-3 text-[#34B7F1]" />
                </div>
              </div>
            </div>

            {/* Bot Message 3 (Confirmed) */}
            <div className="flex justify-start">
              <div className="bg-white text-slate-800 rounded-2xl rounded-tl-xs p-2.5 max-w-[85%] shadow-2xs border-l-2 border-[#14C3A2]">
                <p className="font-medium text-emerald-900">Thanks Elena! Your slot for Saturday at 11:00 AM is reserved. Our team will be in touch.</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                  <span>11:26 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Input Bar */}
          <div className="px-2 pt-2 pb-1 bg-[#F0F2F5] flex items-center gap-2 border-t border-slate-200">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-xs text-slate-400 shadow-2xs">
              Type a message...
            </div>
            <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center text-white shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Card: "New lead captured" */}
      {showLeadBadge && (
        <div className="absolute -bottom-5 -right-6 bg-white/95 border border-slate-200/90 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 animate-float-lead z-30 ring-1 ring-slate-900/5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
              <span>New lead captured</span>
              <span className="w-2 h-2 rounded-full bg-[#14C3A2]" />
            </div>
            <div className="text-[10px] text-slate-500">Elena Vance · Consultation Sat 11am</div>
          </div>
        </div>
      )}
    </div>
  );
};
