import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import journalArticles from '../data/journal';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';

export const JournalArticle = () => {
  const { slug } = useParams();
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <EmptyState
          title="Article not found"
          description="The essay or reflection you are looking for is unavailable."
          actionLabel="All Notes"
          actionTo="/journal"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Journal', to: '/journal' },
    { label: article.title },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <Breadcrumb items={breadcrumbs} />

      <article className="space-y-8 pt-4">
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#77746E] uppercase tracking-wider">
            <span>{article.category}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#242321] leading-[1.1]">
            {article.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-[#77746E]">
            {article.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none text-[#242321] text-sm sm:text-base leading-relaxed space-y-6 pt-4 font-light">
          {article.content.trim().split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        {/* Bottom CTA / Return */}
        <div className="pt-12 mt-12 border-t border-[#D8D2C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#242321] hover:text-[#77746E]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all Journal Notes</span>
          </Link>

          <Button to="/products" variant="primary" size="sm">
            Explore the Collection
          </Button>
        </div>
      </article>
    </div>
  );
};

export default JournalArticle;
