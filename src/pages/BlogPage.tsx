import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, BookOpen } from 'lucide-react';
import { Seo } from '../components/Seo';
import { BLOG_ARTICLES } from '../data/blogArticles';
import { PLACEHOLDERS } from '../data/placeholders';

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#F7F8FC] min-h-screen">
      <Seo
        title="Blog | Simply Talk"
        description="Practical insights on website conversion, WhatsApp automation, lead qualification, and customer service for small businesses."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-[#3B2FD0] font-bold text-xs uppercase tracking-wider">
            Resources & Guides
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2433] tracking-tight">
            Customer conversations, explained simply
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            Practical strategies for small business owners who want to answer faster, qualify better, and capture every lead.
          </p>
        </div>

        {/* 6 Starter Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article, idx) => (
            <article
              key={article.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* SVG Card Header Graphic */}
                <div className="h-44 bg-gradient-to-br from-[#3B2FD0]/10 via-slate-50 to-[#14C3A2]/10 p-6 flex flex-col justify-between border-b border-slate-100 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#3B2FD0]">
                    <span className="bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-2xs">
                      {article.category}
                    </span>
                    <span className="text-slate-400 font-normal">{article.readTime}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#3B2FD0] shadow-sm">
                    <BookOpen className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#1F2433] group-hover:text-[#3B2FD0] transition-colors leading-snug">
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${article.slug}`}
                  className="text-xs font-bold text-[#3B2FD0] group-hover:text-indigo-800 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="bg-[#3B2FD0] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Never miss an enquiry again</h3>
          <p className="text-slate-200 text-sm max-w-lg mx-auto">
            Test Simply Talk on your own website in less than 5 minutes on our Free plan.
          </p>
          <div className="pt-2">
            <a
              href={PLACEHOLDERS.APP_URL}
              className="px-8 py-3.5 rounded-full bg-[#14C3A2] text-[#1F2433] font-black text-sm hover:bg-[#10B092] transition-colors shadow-md inline-flex items-center gap-2"
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
