import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import journalArticles from '../../data/journal';

export const JournalSection = () => {
  const articles = journalArticles.slice(0, 2);

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#D8D2C8]/70">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-8 sm:mb-12">
        <div>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
            Editorial & Reflections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#242321]">
            Notes on a good life.
          </h2>
        </div>
        <Link
          to="/journal"
          className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] font-medium text-[#242321] hover:text-[#77746E] transition-colors"
        >
          <span>All Articles ({journalArticles.length})</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/journal/${article.slug}`}
            className="group flex flex-col select-none"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] bg-[#EAE5DC] overflow-hidden mb-5">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[11px] text-[#77746E] uppercase tracking-wider">
                <span>{article.category}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-medium text-[#242321] group-hover:text-[#77746E] transition-colors">
                  {article.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-[#242321] opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 shrink-0" />
              </div>

              <p className="text-xs sm:text-sm text-[#77746E] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JournalSection;
