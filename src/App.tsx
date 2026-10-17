import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { PricingPage } from './pages/PricingPage';
import { PartnerProgramPage } from './pages/PartnerProgramPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { AdminLeadsPage } from './pages/AdminLeadsPage';
import { AiStudioLabPage } from './pages/AiStudioLabPage';

// Scroll to top helper on hash route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen text-[#1F2433] bg-[#F7F8FC]">
        {/* Sticky Header with shrink on scroll */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:industry" element={<IndustryDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/partner-program" element={<PartnerProgramPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
            <Route path="/ai-lab" element={<AiStudioLabPage />} />
          </Routes>
        </main>

        {/* Global Footer (Dark Slate #1F2433) */}
        <Footer />

        {/* Floating Elements on EVERY page:
            1. Chat widget bubble (teal, bottom-right, 64px, pulse every 8s)
            2. WhatsApp button (green, bottom-left)
        */}
        <WhatsAppFloatingButton />
        <ChatWidget />
      </div>
    </HashRouter>
  );
}
