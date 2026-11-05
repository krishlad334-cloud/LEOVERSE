import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import journalArticles from '../data/journal';
import Breadcrumb from '../components/common/Breadcrumb';

export const Journal = () => {
  const breadcrumbs = [{ label: 'Notes on a Good Life' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <div className="pb-8 mb-12 border-b border-[#D8D2C8] max-w-2xl">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#77746E] block mb-1">
          The LEOVERSE Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#242321]">
          Notes on a good life.
        </h1>
        <p className="text-xs sm:text-sm text-[#77746E] mt-2">
          Conversations on modern dressing, tactile luxury, architecture, and the deliberate art of unhurried everyday living.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {journalArticles.map((article) => (
          <Link
            key={article.id}
            to={`/journal/${article.slug}`}
            className="group flex flex-col select-none border border-[#D8D2C8] bg-[#FAF9F6] overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
              />
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] text-[#77746E] uppercase tracking-wider mb-2">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-lg font-medium text-[#242321] group-hover:text-[#77746E] transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-[#77746E] mt-2 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8D2C8] flex items-center justify-between text-xs font-medium text-[#242321]">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Journal;
