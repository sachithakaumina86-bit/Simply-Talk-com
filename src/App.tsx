import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Critical path: Keep HomePage in the primary bundle for instant First Contentful Paint (FCP)
import { HomePage } from './pages/HomePage';

// Route-level code-splitting: Lazy load non-critical inner pages to minimize initial bundle payload
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage').then(m => ({ default: m.IndustryDetailPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const PartnerProgramPage = lazy(() => import('./pages/PartnerProgramPage').then(m => ({ default: m.PartnerProgramPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));
const AdminLeadsPage = lazy(() => import('./pages/AdminLeadsPage').then(m => ({ default: m.AdminLeadsPage })));
const AiStudioLabPage = lazy(() => import('./pages/AiStudioLabPage').then(m => ({ default: m.AiStudioLabPage })));

// Scroll to top helper on hash route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Minimal, zero-CLS skeleton placeholder while lazy chunks load
function PageFallback() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#F7F8FC]">
      <div className="w-8 h-8 rounded-full border-3 border-[#3B2FD0] border-t-[#14C3A2] animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen text-[#1F2433] bg-[#F7F8FC]">
        {/* Sticky Header with optimized rAF scroll listener */}
        <Header />

        {/* Main Content Area with code-split routing */}
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
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
          </Suspense>
        </main>

        {/* Global Footer (Dark Slate #1F2433) */}
        <Footer />

        {/* Floating Interactive Elements */}
        <WhatsAppFloatingButton />
        <ChatWidget />
      </div>
    </HashRouter>
  );
}
