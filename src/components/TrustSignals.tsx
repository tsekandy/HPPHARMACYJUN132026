import React from 'react';
import { CheckCircle, Award, Users, Shield, ExternalLink } from 'lucide-react';

export default function TrustSignals() {
  return (
    <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Why Trust Us</p>
          <h2 className="heading-lg text-neutral-900 mb-4">Licensed & Certified Pharmacy</h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Happy Pills Pharmacy is fully licensed and regulated by Uganda's healthcare authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Award className="w-6 h-6" />,
              title: 'NDA Approved',
              description: 'Licensed by the National Drug Authority of Uganda',
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Qualified Staff',
              description: 'All pharmacists registered with UHPC (Uganda Health Professional Council)',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: '24/7 Available',
              description: 'Round-the-clock service with emergency support',
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: 'Quality Assured',
              description: 'All medicines sourced from verified manufacturers',
            },
          ].map((item, i) => (
            <div key={i} className="card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Partner Banner */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-teal-900 to-teal-700 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-16 h-16 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4Z"/>
                <path d="M16 24h16M24 16v16"/>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-teal-300 text-xs font-semibold uppercase tracking-widest mb-1">Official Partner</p>
              <h3 className="text-white text-xl font-bold mb-1">Medibridge Africa</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Happy Pills Pharmacy is a proud partner of Medibridge Africa — connecting patients across the continent to quality pharmaceutical care and healthcare resources.
              </p>
            </div>
            <a
              href="https://www.medibridge.africa"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-white text-teal-800 font-semibold text-sm rounded-xl hover:bg-teal-50 transition-colors shadow-sm"
            >
              Visit Medibridge Africa
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12">
          <h3 className="heading-md text-neutral-900 mb-6 text-center">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Grace M.',
                location: 'Kampala',
                rating: 5,
                review: 'Excellent service! Very professional pharmacists and fast delivery. Highly recommended!',
              },
              {
                name: 'James K.',
                location: 'Wakiso',
                rating: 5,
                review: 'Found the rare medicine I needed within 48 hours. Amazing team!',
              },
              {
                name: 'Sarah N.',
                location: 'Mukono',
                rating: 5,
                review: 'The prescription upload feature is so convenient. Great experience overall.',
              },
            ].map((review, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-neutral-700 text-sm italic mb-4">"{review.review}"</p>
                <p className="font-semibold text-neutral-900 text-sm">{review.name}</p>
                <p className="text-xs text-neutral-500">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
