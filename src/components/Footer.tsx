import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { PLACEHOLDERS } from '../data/placeholders';
import { Placeholder } from './Placeholder';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2433] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Left Block (FINAL COPY) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="white" size="lg" showTagline />
            <p className="text-xl font-bold text-white max-w-sm mt-3">
              Stop missing leads. Start talking to every visitor.
            </p>
            <p className="text-slate-400 text-sm max-w-sm">
              Simply Talk is your AI front desk that talks to every visitor, so no enquiry goes unanswered.
            </p>
            <div className="pt-2">
              <a
                href={PLACEHOLDERS.APP_URL}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14C3A2] text-[#1F2433] font-bold text-sm hover:bg-[#10B092] transition-colors shadow-sm cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Contact details block with placeholders */}
            <div className="pt-4 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Company:</span>
                <Placeholder value={PLACEHOLDERS.COMPANY_NAME} />
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#14C3A2] shrink-0" />
                <div className="flex flex-wrap items-center gap-x-1.5 text-slate-300">
                  <a href="tel:0716460440" className="hover:text-[#14C3A2] transition-colors">071 646 0440</a>
                  <span className="text-slate-500">/</span>
                  <a href="tel:0716992185" className="hover:text-[#14C3A2] transition-colors">071 699 2185</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#14C3A2]" />
                <Placeholder value={PLACEHOLDERS.EMAIL} />
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#14C3A2]" />
                <Placeholder value={PLACEHOLDERS.REGISTERED_ADDRESS} />
              </div>
            </div>
          </div>

          {/* Column: Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/features" className="hover:text-[#14C3A2] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#14C3A2] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-[#14C3A2] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('simplytalk:open-chat'))}
                  className="text-left hover:text-[#14C3A2] transition-colors cursor-pointer"
                >
                  Live Chat Demo
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${PLACEHOLDERS.WHATSAPP_DEMO_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#14C3A2] transition-colors"
                >
                  WhatsApp Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#14C3A2] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/partner-program" className="hover:text-[#14C3A2] transition-colors">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#14C3A2] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#14C3A2] transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#14C3A2] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-[#14C3A2] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin/leads" className="text-slate-500 hover:text-slate-400 text-xs">
                  Lead Logs (Demo)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line (FINAL COPY) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            Simply Talk, the AI assistant for lead capture and customer enquiries. © {currentYear}{' '}
            <Placeholder value={PLACEHOLDERS.COMPANY_NAME} />
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14C3A2]"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
