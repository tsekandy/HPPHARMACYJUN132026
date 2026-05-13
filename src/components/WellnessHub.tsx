import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import PharmacistPickerModal from './PharmacistPickerModal';

interface WellnessHubProps {
  onArticleClick?: (slug: string) => void;
}

export default function WellnessHub({ onArticleClick }: WellnessHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));
  const filteredArticles = selectedCategory
    ? ARTICLES.filter((a) => a.category === selectedCategory)
    : ARTICLES;

  return (
    <section className="section-padding bg-neutral-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">
            <BookOpen className="w-4 h-4 inline mr-2" />
            Health & Wellness Hub
          </p>
          <h2 className="heading-lg text-neutral-900 mb-4">Expert Health Articles & Guides</h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Learn from our licensed pharmacists and healthcare professionals about medicines, health conditions, and wellness tips.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-600'
            }`}
          >
            All Articles
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <button
              key={article.id}
              onClick={() => onArticleClick?.(article.slug)}
              className="card overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group text-left"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-neutral-200">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="heading-sm text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-1">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="border-t border-neutral-200 pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.read_time} min read</span>
                    </div>
                    <span className="text-xs text-neutral-400">
                      {new Date(article.published_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Read More Link */}
                <button className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group/link">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-600 mb-6">
            Looking for specific health information? Our pharmacists are available on WhatsApp for personalized advice.
          </p>
          <button className="btn-primary" onClick={() => setShowPicker(true)}>
            Talk to a Pharmacist
          </button>
        </div>

        {showPicker && (
          <PharmacistPickerModal onClose={() => setShowPicker(false)} />
        )}
      </div>
    </section>
  );
}