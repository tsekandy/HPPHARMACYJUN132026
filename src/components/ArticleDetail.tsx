import React, { useMemo } from 'react';
import { ArrowLeft, Share2, Clock, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-neutral-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

interface ArticleDetailProps {
  slug: string;
  onBack: () => void;
  onArticleChange?: (slug: string) => void;
}

export default function ArticleDetail({ slug, onBack, onArticleChange }: ArticleDetailProps) {
  const article = useMemo(() => ARTICLES.find((a) => a.slug === slug), [slug]);
  const currentIndex = useMemo(() => ARTICLES.findIndex((a) => a.slug === slug), [slug]);
  const prevArticle = useMemo(() => (currentIndex > 0 ? ARTICLES[currentIndex - 1] : null), [currentIndex]);
  const nextArticle = useMemo(() => (currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null), [currentIndex]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Article not found</p>
          <button onClick={onBack} className="btn-primary">
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = `${window.location.origin}?article=${article.slug}`;
    const text = `Check out this article: ${article.title}`;

    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: text,
        url: url,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="section-container py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Articles
          </button>

          {/* Article Meta */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-neutral-500">{article.read_time} min read</span>
            </div>

            <h1 className="heading-lg text-neutral-900 mb-4">{article.title}</h1>

            <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.featured_image && (
        <div className="w-full h-96 overflow-hidden bg-neutral-100">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="section-container max-w-3xl py-12">
        <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
          {article.content.split('\n\n').map((paragraph, index) => {
            // Handle headings
            if (paragraph.startsWith('# ')) {
              return (
                <h1 key={index} className="heading-lg text-neutral-900 mt-10 mb-4">
                  {paragraph.replace(/^# /, '')}
                </h1>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="heading-md text-neutral-900 mt-8 mb-3">
                  {paragraph.replace(/^## /, '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="heading-sm text-neutral-900 mt-6 mb-2">
                  {paragraph.replace(/^### /, '')}
                </h3>
              );
            }

            // Handle lists
            if (paragraph.trim().startsWith('- ')) {
              const items = paragraph.split('\n').filter((item) => item.trim().startsWith('- '));
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4 ml-2">
                  {items.map((item, i) => (
                    <li key={i} className="text-neutral-700">
                      {renderInline(item.replace(/^- /, ''))}
                    </li>
                  ))}
                </ul>
              );
            }

            // Regular paragraphs
            if (paragraph.trim()) {
              return (
                <p key={index} className="mb-4 text-justify">
                  {renderInline(paragraph)}
                </p>
              );
            }

            return null;
          })}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm font-semibold text-neutral-600 mb-3">TAGS</p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Navigation */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-12">
        <div className="section-container max-w-3xl">
          <h3 className="heading-sm text-neutral-900 mb-6">More Articles</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevArticle && (
              <button
                onClick={() => onArticleChange?.(prevArticle.slug)}
                className="card p-6 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <ChevronLeft className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-1">Previous</p>
                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {prevArticle.title}
                    </p>
                  </div>
                </div>
              </button>
            )}

            {nextArticle && (
              <button
                onClick={() => onArticleChange?.(nextArticle.slug)}
                className="card p-6 text-left hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-1">Next</p>
                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {nextArticle.title}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <h3 className="heading-sm text-neutral-900 mb-6">Related Articles</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ARTICLES.filter((a) => a.category === article.category && a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <button
                  key={relatedArticle.id}
                  onClick={() => onArticleChange?.(relatedArticle.slug)}
                  className="card overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="h-40 overflow-hidden bg-neutral-100">
                    <img
                      src={relatedArticle.featured_image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary-600 font-semibold mb-2">{relatedArticle.category}</p>
                    <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                      {relatedArticle.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      {relatedArticle.read_time} min read
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
