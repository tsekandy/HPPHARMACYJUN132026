import React, { useState } from 'react';
import { ArrowLeft, Handshake, TrendingUp, Users, Shield, Award, CheckCircle } from 'lucide-react';

interface BecomePartnerProps {
  onBack: () => void;
}

export default function BecomePartner({ onBack }: BecomePartnerProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create Gmail compose URL
    const subject = encodeURIComponent(`Partnership Application - ${formData.businessName}`);
    const body = encodeURIComponent(`Hello Happy Pills Pharmacy,

I'm interested in becoming a partner with your pharmacy.

Business Name: ${formData.businessName}
Contact Person: ${formData.contactPerson}
Email: ${formData.email}
Phone: ${formData.phone}
Business Type: ${formData.businessType}
Location: ${formData.location}
Message: ${formData.message}

Please contact me to discuss partnership opportunities.

Best regards,
${formData.contactPerson}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=happypillspharmacy@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
      title: 'Revenue Growth',
      description: 'Increase your revenue streams through pharmaceutical partnerships and referrals.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Customer Expansion',
      description: 'Access to our customer base and extended market reach across Uganda.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: 'Quality Assurance',
      description: 'Partner with a licensed, professional pharmacy with proven track record.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: 'Brand Association',
      description: 'Associate your business with a trusted healthcare brand in Uganda.'
    }
  ];

  const partnerTypes = [
    {
      title: 'Healthcare Providers',
      description: 'Hospitals, clinics, and medical centers looking for reliable pharmaceutical partnerships.',
      features: ['Prescription fulfillment', 'Emergency medication supply', 'Bulk ordering discounts', 'Priority service']
    },
    {
      title: 'Delivery Partners',
      description: 'Logistics and delivery companies to expand our reach across Uganda.',
      features: ['Flexible delivery schedules', 'Competitive rates', 'Training provided', 'Growth opportunities']
    },
    {
      title: 'Technology Partners',
      description: 'Tech companies to enhance our digital healthcare solutions.',
      features: ['API integration', 'Custom solutions', 'Revenue sharing', 'Innovation collaboration']
    },
    {
      title: 'Community Partners',
      description: 'Local businesses and organizations to serve communities better.',
      features: ['Community health programs', 'Educational partnerships', 'Local presence', 'Mutual referrals']
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
            <Handshake className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">Become Our Partner</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-3xl mx-auto">
            Join Happy Pills Pharmacy in transforming healthcare delivery across Uganda.
            Let's work together to make quality pharmaceutical care accessible to everyone.
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="heading-sm text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-body-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Partnership Opportunities</h2>
          <div className="divider mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="card p-6">
                <h3 className="heading-sm text-neutral-900 mb-3">{type.title}</h3>
                <p className="text-body mb-5">{type.description}</p>

                <h4 className="font-semibold text-neutral-900 mb-3">Benefits include:</h4>
                <ul className="space-y-2.5">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-body-sm">
                      <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 mr-2.5 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-md text-neutral-900 mb-2 text-center">Partner Application Form</h2>
            <div className="divider mx-auto mb-8" />

            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="input-field"
                    placeholder="Your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field"
                    placeholder="+256..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                    className="input-field"
                  >
                    <option value="">Select business type</option>
                    <option value="healthcare">Healthcare Provider</option>
                    <option value="delivery">Delivery Service</option>
                    <option value="technology">Technology Company</option>
                    <option value="supplier">Supplier</option>
                    <option value="exporter">Exporter</option>
                    <option value="community">Community Organization</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="City, Uganda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Partnership Interest & Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about your business and partnership interests..."
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="btn-primary text-lg px-10 py-3.5"
                >
                  Submit Partnership Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Questions About Partnership?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Our partnership team is ready to discuss opportunities with you.
          </p>
          <button
            onClick={() => {
              const message = "Hello Happy Pills Pharmacy! I have questions about partnership opportunities.";
              const whatsappUrl = `https://wa.me/256702275953?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Contact Partnership Team
          </button>
        </div>
      </section>
    </div>
  );
}
