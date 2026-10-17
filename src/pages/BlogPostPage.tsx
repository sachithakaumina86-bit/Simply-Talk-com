import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Seo } from '../components/Seo';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { PLACEHOLDERS } from '../data/placeholders';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title={`${article.title} | Simply Talk Blog`}
        description={article.excerpt}
      />

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#3B2FD0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase">
            {article.category}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2433] tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
          <p className="font-semibold text-xl text-[#1F2433] leading-snug">
            {article.excerpt}
          </p>

          <hr className="border-slate-100 my-6" />

          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Post CTA */}
        <div className="bg-[#3B2FD0] text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-extrabold">Never miss an enquiry again</h3>
          <p className="text-slate-200 text-sm max-w-md mx-auto">
            Give every visitor an immediate answer. Start free today without a credit card.
          </p>
          <div className="pt-2">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="px-7 py-3 rounded-full bg-[#14C3A2] text-[#1F2433] font-black text-sm hover:bg-[#10B092] transition-colors shadow-md inline-flex items-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
