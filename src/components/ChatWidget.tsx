import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Sparkles, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { PLACEHOLDERS } from '../data/placeholders';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  time: string;
}

export interface CapturedLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  page: string;
  timestamp: string;
  summary?: string;
  channel: 'website_bot' | 'contact_form' | 'whatsapp_demo';
  status: 'new' | 'contacted' | 'qualified';
}

const STORAGE_KEY = 'simplytalk_captured_leads';

export function saveLead(lead: Omit<CapturedLead, 'id' | 'timestamp'>) {
  const newLead: CapturedLead = {
    ...lead,
    id: 'lead_' + Date.now(),
    timestamp: new Date().toISOString(),
  };

  // 1. Save to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(newLead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save lead to localStorage', e);
  }

  // 2. Persist to Firestore
  try {
    const leadDocRef = doc(db, 'leads', newLead.id);
    setDoc(leadDocRef, {
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone || '',
      page: newLead.page,
      channel: newLead.channel,
      status: newLead.status,
      summary: newLead.summary || 'Captured via Simply Talk live chat demo',
      createdAt: new Date().toISOString(),
    }).catch((err) => {
      console.warn('Firestore write warning:', err);
    });
  } catch (err) {
    console.warn('Firestore init warning:', err);
  }

  return newLead;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [leadStep, setLeadStep] = useState<'idle' | 'asking_name' | 'asking_phone' | 'asking_email' | 'done'>('idle');
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [handoverDone, setHandoverDone] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hi, I'm the Simply Talk assistant. Ask me about pricing, features or how to get started.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Listen for custom trigger event to open chat from any button on page
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('simplytalk:open-chat', handleOpenChat);
    return () => window.removeEventListener('simplytalk:open-chat', handleOpenChat);
  }, []);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setUserMsgCount((c) => c + 1);
    setIsTyping(true);

    // If we are currently capturing lead data step by step
    if (leadStep === 'asking_name') {
      setLeadData((prev) => ({ ...prev, name: textToSend }));
      setLeadStep('asking_phone');
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: `Thanks ${textToSend}! What is the best phone number for our team to contact you on?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    if (leadStep === 'asking_phone') {
      setLeadData((prev) => ({ ...prev, phone: textToSend }));
      setLeadStep('asking_email');
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: `Got that. And what is your work email address?`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    if (leadStep === 'asking_email') {
      const finalEmail = textToSend;
      setLeadData((prev) => ({ ...prev, email: finalEmail }));
      setLeadStep('done');
      setIsTyping(false);

      // Save the complete lead!
      saveLead({
        name: leadData.name || 'Website Visitor',
        phone: leadData.phone || 'Not provided',
        email: finalEmail,
        page: window.location.hash || window.location.pathname || '/',
        channel: 'website_bot',
        status: 'new',
        summary: 'Qualified lead captured during chat demo',
      });

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: 'Thanks, our team will be in touch.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      return;
    }

    // Call server Gemini API (gemini-3.1-flash-lite)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });

      const data = await res.json();
      const replyText = data.text || 'Simply Talk replies instantly 24/7. How can we assist your business?';

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // If buyer intent detected after 2-3 messages and lead hasn't been collected yet
      if (userMsgCount >= 2 && leadStep === 'idle') {
        const lower = textToSend.toLowerCase();
        if (
          lower.includes('price') ||
          lower.includes('cost') ||
          lower.includes('plan') ||
          lower.includes('demo') ||
          lower.includes('start') ||
          lower.includes('sign') ||
          lower.includes('how')
        ) {
          setTimeout(() => {
            setLeadStep('asking_name');
            setMessages((prev) => [
              ...prev,
              {
                id: 'bot_lead_' + Date.now(),
                sender: 'bot',
                text: 'To get you started or send you tailored details, may I take your name?',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }, 800);
        }
      }
    } catch (e) {
      // Mock fallback
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_err_' + Date.now(),
          sender: 'bot',
          text: 'Simply Talk works 24/7 on website and WhatsApp to capture every customer enquiry. Would you like our team to get in touch?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleHandover = () => {
    setHandoverDone(true);
    console.log(`[Handover] Notification sent to ${PLACEHOLDERS.TEAM_EMAIL}`);
    setMessages((prev) => [
      ...prev,
      {
        id: 'sys_' + Date.now(),
        sender: 'system',
        text: `Handover request logged. Notification sent to ${PLACEHOLDERS.TEAM_EMAIL}. Our team will contact you shortly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Bubble (Bottom-right, 64px, pulse every 8s) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Simply Talk Live Chat"
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#14C3A2] text-[#1F2433] shadow-2xl flex items-center justify-center pulse-badge transition-transform duration-300 hover:scale-110 active:scale-95 z-50 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#14C3A2]/40"
        >
          <MessageSquare className="w-8 h-8 fill-current" />
          <span className="sr-only">Open chat</span>
        </button>
      )}

      {/* Chat Window (380x600 desktop, full screen mobile, rounded corners, indigo header) */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[380px] h-full sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200 ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Indigo Header with Logo & Controls */}
          <div className="bg-[#3B2FD0] text-white p-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <Logo variant="white" size="sm" showTagline />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader status bar */}
          <div className="bg-[#241b8a] text-slate-200 px-4 py-1.5 text-[11px] flex items-center justify-between border-t border-indigo-400/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#14C3A2]" />
              <span>Live Assistant Demo · Powered by Gemini</span>
            </div>
            <button
              onClick={handleHandover}
              className="text-[#14C3A2] hover:underline font-medium cursor-pointer"
            >
              Talk to a person
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F8FC]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === 'user'
                    ? 'justify-end'
                    : m.sender === 'system'
                    ? 'justify-center'
                    : 'justify-start'
                }`}
              >
                {m.sender === 'bot' && (
                  <img
                    src="/logo.jpeg"
                    alt="SimplyTalk"
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="w-7 h-7 rounded-full object-cover mr-2 shrink-0 shadow-xs ring-1 ring-emerald-500/30"
                  />
                )}

                {m.sender === 'system' ? (
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl px-3 py-2 text-xs text-center max-w-[90%] shadow-2xs">
                    {m.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-[#3B2FD0] text-white rounded-tr-xs'
                        : 'bg-white text-[#1F2433] border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {m.time}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <img
                  src="/logo.jpeg"
                  alt="SimplyTalk"
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 rounded-full object-cover shrink-0 shadow-xs ring-1 ring-emerald-500/30"
                />
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => handleSend('What does it cost?')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#14C3A2]/20 hover:text-[#1F2433] text-slate-700 font-medium transition-colors cursor-pointer"
            >
              What does it cost?
            </button>
            <button
              onClick={() => handleSend('How does it work?')}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#14C3A2]/20 hover:text-[#1F2433] text-slate-700 font-medium transition-colors cursor-pointer"
            >
              How does it work?
            </button>
            <button
              onClick={() =>
                window.open(`https://wa.me/${PLACEHOLDERS.WHATSAPP_DEMO_NUMBER}`, '_blank')
              }
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium transition-colors cursor-pointer"
            >
              Try it on WhatsApp
            </button>
            <button
              onClick={handleHandover}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Talk to a person
            </button>
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                leadStep === 'asking_name'
                  ? 'Type your name...'
                  : leadStep === 'asking_phone'
                  ? 'Type your phone number...'
                  : leadStep === 'asking_email'
                  ? 'Type your work email...'
                  : 'Type a question...'
              }
              className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#3B2FD0] focus:border-transparent text-[#1F2433]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-[#14C3A2] text-[#1F2433] flex items-center justify-center hover:bg-[#10B092] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="bg-white px-4 py-1.5 text-center text-[10px] text-slate-400 border-t border-slate-100">
            By chatting you agree to our{' '}
            <a href="#/privacy-policy" className="underline hover:text-slate-600">
              Privacy Policy
            </a>
          </div>
        </div>
      )}
    </>
  );
};
