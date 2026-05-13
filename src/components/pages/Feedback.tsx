import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Star, ThumbsUp, AlertCircle, Lightbulb } from 'lucide-react';

interface FeedbackProps {
  onBack: () => void;
}

export default function Feedback({ onBack }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ratingText = '⭐'.repeat(rating);
    const message = `Hello Happy Pills Pharmacy! I have feedback for you.

Rating: ${ratingText} (${rating}/5)
Type: ${feedbackType}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Message: ${formData.message}

Thank you for providing excellent service!`;

    const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const feedbackTypes = [
    {
      value: 'compliment',
      label: 'Compliment',
      icon: <ThumbsUp className="w-6 h-6 text-primary-600" />,
      description: 'Share positive feedback about our service'
    },
    {
      value: 'suggestion',
      label: 'Suggestion',
      icon: <Lightbulb className="w-6 h-6 text-accent-500" />,
      description: 'Suggest improvements or new services'
    },
    {
      value: 'complaint',
      label: 'Complaint',
      icon: <AlertCircle className="w-6 h-6 text-primary-600" />,
      description: 'Report issues or concerns'
    },
    {
      value: 'general',
      label: 'General Feedback',
      icon: <MessageSquare className="w-6 h-6 text-primary-600" />,
      description: 'Any other feedback or comments'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="section-container py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-6">
            <MessageSquare className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">We Value Your Feedback</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-2xl mx-auto">
            Your feedback helps us improve our services and better serve the community.
            Please share your thoughts, suggestions, or concerns with us.
          </p>
        </div>
      </section>

      {/* Quick Review Links */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto card p-6">
            <h2 className="heading-sm text-neutral-900 mb-4 text-center">Leave a Quick Review</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const searchUrl = 'https://www.google.com/search?q=Happy+Pills+Pharmacy+Nansana+Uganda+reviews';
                  window.open(searchUrl, '_blank');
                }}
                className="btn-primary"
              >
                Review on Google
              </button>
              <button
                onClick={() => {
                  const message = "Hello Happy Pills Pharmacy! I'd like to leave a positive review about your service.";
                  const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-md text-neutral-900 mb-2 text-center">Detailed Feedback Form</h2>
            <div className="divider mx-auto mb-8" />

            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              {/* Rating */}
              <div className="text-center">
                <label className="block text-lg font-medium text-neutral-700 mb-4">
                  How would you rate our service?
                </label>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-4xl transition-colors ${
                        star <= rating ? 'text-accent-500' : 'text-neutral-300 hover:text-accent-400'
                      }`}
                    >
                      <Star className="w-8 h-8" fill={star <= rating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-body-sm mt-2">
                    You rated us {rating} out of 5 stars
                  </p>
                )}
              </div>

              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-4">
                  What type of feedback is this?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedbackTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                        feedbackType === type.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300 hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        checked={feedbackType === type.value}
                        onChange={(e) => setFeedbackType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start">
                        <div className="mr-3">
                          {type.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900">{type.label}</h3>
                          <p className="text-body-sm mt-1">{type.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field"
                    placeholder="+256..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="input-field"
                    placeholder="Brief subject line"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={5}
                  className="input-field"
                  placeholder="Please share your detailed feedback..."
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="btn-primary text-lg px-10 py-3.5"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold text-white mb-2">Phone</h3>
              <p className="text-primary-100">+256 709 745 309</p>
              <p className="text-primary-100">+256 709 745 309</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-primary-100">happypillspharmacy@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-primary-100">Zalex House Nansana Trading Centre</p>
              <p className="text-primary-100">Kampala-Hoima Road, Kampala</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
