import React from 'react';

interface FeatureIllustrationProps {
  id: string;
  className?: string;
  title: string;
}

export const FeatureIllustration: React.FC<FeatureIllustrationProps> = ({ id, className = '', title }) => {
  return (
    <div
      className={`relative w-full max-w-[480px] aspect-4/3 rounded-2xl bg-gradient-to-br from-[#3B2FD0]/5 via-white to-[#14C3A2]/10 border border-slate-200/80 shadow-sm flex items-center justify-center p-6 overflow-hidden ${className}`}
      role="img"
      aria-label={title}
    >
      {/* Decorative background grid and soft glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#3B2FD0_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.12]" />
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#14C3A2]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#3B2FD0]/15 rounded-full blur-2xl pointer-events-none" />

      {id === 'website-chatbot' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Browser Frame */}
          <rect x="20" y="20" width="280" height="180" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M20 50H300" stroke="#F1F5F9" strokeWidth="2" />
          <circle cx="40" cy="35" r="4" fill="#CBD5E1" />
          <circle cx="54" cy="35" r="4" fill="#CBD5E1" />
          <circle cx="68" cy="35" r="4" fill="#CBD5E1" />
          <rect x="90" y="29" width="120" height="12" rx="6" fill="#F8FAFC" />
          {/* Website Content Mockup */}
          <rect x="40" y="70" width="100" height="10" rx="5" fill="#E2E8F0" />
          <rect x="40" y="90" width="80" height="8" rx="4" fill="#F1F5F9" />
          <rect x="40" y="106" width="60" height="8" rx="4" fill="#F1F5F9" />
          {/* Embedded Chatbot Window */}
          <rect x="160" y="75" width="125" height="115" rx="8" fill="#FFFFFF" stroke="#3B2FD0" strokeWidth="2" filter="drop-shadow(0 8px 16px rgba(59, 47, 208, 0.12))" />
          <path d="M160 75H285V95H160V75Z" fill="#3B2FD0" />
          <circle cx="174" cy="85" r="4" fill="#14C3A2" />
          <rect x="184" y="82" width="50" height="6" rx="3" fill="#FFFFFF" />
          {/* Bot Speech Bubble */}
          <rect x="170" y="105" width="90" height="24" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
          <rect x="176" y="112" width="75" height="4" rx="2" fill="#1F2433" />
          <rect x="176" y="120" width="50" height="4" rx="2" fill="#64748B" />
          {/* User Reply Bubble */}
          <rect x="195" y="136" width="80" height="20" rx="6" fill="#3B2FD0" />
          <rect x="202" y="144" width="65" height="4" rx="2" fill="#FFFFFF" />
          {/* Input Bar */}
          <rect x="168" y="165" width="108" height="18" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
          <circle cx="268" cy="174" r="5" fill="#14C3A2" />
        </svg>
      )}

      {id === 'whatsapp-assistant' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Phone Silhouette */}
          <rect x="90" y="15" width="140" height="195" rx="22" fill="#1F2433" />
          <rect x="96" y="22" width="128" height="180" rx="16" fill="#ECE5DD" />
          {/* WhatsApp Header */}
          <rect x="96" y="22" width="128" height="32" rx="4" fill="#075E54" />
          <circle cx="114" cy="38" r="8" fill="#14C3A2" />
          <rect x="128" y="34" width="55" height="5" rx="2.5" fill="#FFFFFF" />
          <rect x="128" y="42" width="35" height="3.5" rx="1.5" fill="#A7F3D0" />
          {/* Chat Stream */}
          <rect x="104" y="66" width="88" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
          <rect x="110" y="73" width="70" height="4" rx="2" fill="#1F2433" />
          <rect x="110" y="81" width="50" height="4" rx="2" fill="#64748B" />
          {/* WhatsApp Bot Message */}
          <rect x="124" y="104" width="92" height="34" rx="6" fill="#DCF8C6" stroke="#BBF7D0" />
          <rect x="130" y="112" width="78" height="4" rx="2" fill="#1F2433" />
          <rect x="130" y="120" width="70" height="4" rx="2" fill="#1F2433" />
          <rect x="130" y="128" width="45" height="4" rx="2" fill="#10B981" />
          {/* Input footer */}
          <rect x="102" y="174" width="94" height="20" rx="10" fill="#FFFFFF" />
          <circle cx="208" cy="184" r="10" fill="#25D366" />
          <path d="M205 184L211 180V188L205 184Z" fill="#FFFFFF" />
        </svg>
      )}

      {id === 'knowledge-training' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* PDF File Sheet */}
          <rect x="40" y="45" width="85" height="115" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M100 45L125 70H100V45Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="52" y="60" width="30" height="12" rx="3" fill="#3B2FD0" />
          <rect x="52" y="85" width="60" height="5" rx="2.5" fill="#E2E8F0" />
          <rect x="52" y="96" width="55" height="5" rx="2.5" fill="#E2E8F0" />
          <rect x="52" y="107" width="45" height="5" rx="2.5" fill="#E2E8F0" />
          <rect x="52" y="118" width="50" height="5" rx="2.5" fill="#E2E8F0" />
          {/* Extraction Stream Arrow */}
          <path d="M140 105C160 105 170 105 185 105" stroke="#14C3A2" strokeWidth="3" strokeDasharray="4 4" />
          <polygon points="188,105 180,100 180,110" fill="#14C3A2" />
          {/* AI Knowledge Core */}
          <circle cx="235" cy="105" r="42" fill="#3B2FD0" />
          <circle cx="235" cy="105" r="34" stroke="#14C3A2" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M225 100C225 94.4772 229.477 90 235 90C240.523 90 245 94.4772 245 100C245 104 241 106 235 110V114" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="235" cy="120" r="2" fill="#FFFFFF" />
        </svg>
      )}

      {id === 'lead-qualification' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Funnel Concept */}
          <path d="M60 40H260L190 115V180L130 155V115L60 40Z" fill="url(#funnelGrad)" stroke="#3B2FD0" strokeWidth="2" />
          <defs>
            <linearGradient id="funnelGrad" x1="160" y1="40" x2="160" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B2FD0" stopOpacity="0.15" />
              <stop stopColor="#14C3A2" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Visitor Tokens */}
          <circle cx="100" cy="55" r="7" fill="#94A3B8" />
          <circle cx="160" cy="55" r="7" fill="#94A3B8" />
          <circle cx="220" cy="55" r="7" fill="#94A3B8" />
          {/* Filter Stage */}
          <rect x="110" y="85" width="100" height="22" rx="11" fill="#FFFFFF" stroke="#3B2FD0" strokeWidth="1.5" />
          <text x="160" y="100" textAnchor="middle" fill="#3B2FD0" fontSize="9" fontWeight="700">READY TO BUY</text>
          {/* Qualified Leads Output */}
          <circle cx="160" cy="145" r="14" fill="#14C3A2" />
          <path d="M154 145L158 149L167 140" stroke="#1F2433" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {id === 'lead-capture' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Lead Card Card */}
          <rect x="70" y="35" width="180" height="150" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(20, 195, 162, 0.15))" />
          <path d="M70 35H250V70H70V35Z" fill="#14C3A2" />
          <circle cx="95" cy="52" r="8" fill="#1F2433" />
          <rect x="112" y="47" width="70" height="6" rx="3" fill="#1F2433" />
          <rect x="112" y="56" width="40" height="4" rx="2" fill="#1F2433" fillOpacity="0.7" />
          {/* Captured Fields */}
          <rect x="90" y="85" width="140" height="18" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="98" y="91" width="60" height="6" rx="3" fill="#64748B" />
          <rect x="90" y="112" width="140" height="18" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="98" y="118" width="75" height="6" rx="3" fill="#64748B" />
          <rect x="90" y="139" width="140" height="18" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="98" y="145" width="90" height="6" rx="3" fill="#64748B" />
          {/* Badge */}
          <rect x="160" y="165" width="70" height="16" rx="8" fill="#3B2FD0" />
          <text x="195" y="176" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">NEW LEAD</text>
        </svg>
      )}

      {id === 'multilingual-replies' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Globe Mesh */}
          <circle cx="160" cy="110" r="60" stroke="#3B2FD0" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
          <ellipse cx="160" cy="110" rx="35" ry="60" stroke="#3B2FD0" strokeWidth="1.5" opacity="0.3" />
          <line x1="100" y1="110" x2="220" y2="110" stroke="#3B2FD0" strokeWidth="1.5" opacity="0.3" />
          {/* Floating Language Tags */}
          <g transform="translate(50, 45)">
            <rect width="65" height="28" rx="14" fill="#3B2FD0" />
            <text x="32" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">Hello</text>
          </g>
          <g transform="translate(205, 50)">
            <rect width="65" height="28" rx="14" fill="#14C3A2" />
            <text x="32" y="18" textAnchor="middle" fill="#1F2433" fontSize="11" fontWeight="bold">Hola</text>
          </g>
          <g transform="translate(60, 145)">
            <rect width="65" height="28" rx="14" fill="#FFFFFF" stroke="#3B2FD0" strokeWidth="1.5" />
            <text x="32" y="18" textAnchor="middle" fill="#3B2FD0" fontSize="11" fontWeight="bold">Bonjour</text>
          </g>
          <g transform="translate(200, 140)">
            <rect width="65" height="28" rx="14" fill="#1F2433" />
            <text x="32" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">你好</text>
          </g>
          <circle cx="160" cy="110" r="16" fill="#14C3A2" />
          <path d="M152 110L158 114L168 106" stroke="#1F2433" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {id === 'brand-customisation' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Color palette & controls */}
          <rect x="50" y="40" width="220" height="140" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <rect x="70" y="60" width="70" height="8" rx="4" fill="#1F2433" />
          {/* Color swatches */}
          <circle cx="80" cy="90" r="14" fill="#3B2FD0" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="115" cy="90" r="14" fill="#14C3A2" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="150" cy="90" r="14" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="185" cy="90" r="14" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          {/* Tone Slider */}
          <rect x="70" y="125" width="180" height="6" rx="3" fill="#E2E8F0" />
          <rect x="70" y="125" width="90" height="6" rx="3" fill="#14C3A2" />
          <circle cx="160" cy="128" r="8" fill="#3B2FD0" />
          <text x="70" y="152" fill="#64748B" fontSize="9">Formal</text>
          <text x="160" y="152" textAnchor="middle" fill="#1F2433" fontSize="9" fontWeight="bold">Friendly</text>
          <text x="250" y="152" textAnchor="end" fill="#64748B" fontSize="9">Casual</text>
        </svg>
      )}

      {id === 'conversation-analytics' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Chart Board */}
          <rect x="40" y="30" width="240" height="160" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="70" y1="150" x2="250" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="70" y1="60" x2="70" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Bar Charts */}
          <rect x="85" y="105" width="18" height="45" rx="3" fill="#CBD5E1" />
          <rect x="115" y="85" width="18" height="65" rx="3" fill="#3B2FD0" fillOpacity="0.4" />
          <rect x="145" y="65" width="18" height="85" rx="3" fill="#3B2FD0" />
          <rect x="175" y="50" width="18" height="100" rx="3" fill="#14C3A2" />
          <rect x="205" y="75" width="18" height="75" rx="3" fill="#3B2FD0" />
          {/* Trend Line */}
          <path d="M94 100L124 80L154 60L184 45L214 70" stroke="#1F2433" strokeWidth="3" strokeLinecap="round" />
          <circle cx="184" cy="45" r="5" fill="#1F2433" stroke="#14C3A2" strokeWidth="2" />
        </svg>
      )}

      {id === 'human-handover' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Bot circle */}
          <circle cx="100" cy="110" r="38" fill="#3B2FD0" />
          <path d="M85 105C85 96.7157 91.7157 90 100 90C108.284 90 115 96.7157 115 105V115C115 120 110 123 100 123H92L85 128V105Z" fill="#14C3A2" />
          <circle cx="95" cy="107" r="2" fill="#1F2433" />
          <circle cx="105" cy="107" r="2" fill="#1F2433" />
          {/* Handover Arrow */}
          <path d="M145 110H175" stroke="#14C3A2" strokeWidth="3" strokeDasharray="4 4" />
          <polygon points="178,110 170,105 170,115" fill="#14C3A2" />
          {/* Human Agent circle */}
          <circle cx="220" cy="110" r="38" fill="#14C3A2" />
          <circle cx="220" cy="100" r="14" fill="#1F2433" />
          <path d="M198 132C198 120.954 207.85 118 220 118C232.15 118 242 120.954 242 132V136H198V132Z" fill="#1F2433" />
          <rect x="140" y="45" width="80" height="20" rx="10" fill="#FFFFFF" stroke="#3B2FD0" strokeWidth="1.5" />
          <text x="180" y="58" textAnchor="middle" fill="#3B2FD0" fontSize="9" fontWeight="bold">HANDOVER</text>
        </svg>
      )}

      {id === 'team-access' && (
        <svg viewBox="0 0 320 220" className="w-full h-full max-w-[320px] drop-shadow-md" fill="none">
          {/* Multiple user profiles in harmony */}
          <g transform="translate(130, 40)">
            <circle cx="30" cy="30" r="28" fill="#3B2FD0" />
            <circle cx="30" cy="22" r="10" fill="#FFFFFF" />
            <path d="M16 46C16 38 22 36 30 36C38 36 44 38 44 46V50H16V46Z" fill="#FFFFFF" />
          </g>
          <g transform="translate(60, 95)">
            <circle cx="30" cy="30" r="24" fill="#14C3A2" />
            <circle cx="30" cy="24" r="8" fill="#1F2433" />
            <path d="M18 44C18 38 23 36 30 36C37 36 42 38 42 44V47H18V44Z" fill="#1F2433" />
          </g>
          <g transform="translate(200, 95)">
            <circle cx="30" cy="30" r="24" fill="#1F2433" />
            <circle cx="30" cy="24" r="8" fill="#FFFFFF" />
            <path d="M18 44C18 38 23 36 30 36C37 36 42 38 42 44V47H18V44Z" fill="#FFFFFF" />
          </g>
          <line x1="140" y1="85" x2="105" y2="105" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="180" y1="85" x2="215" y2="105" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      )}
    </div>
  );
};
