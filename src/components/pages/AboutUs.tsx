import React from 'react';
import {
  ArrowLeft,
  Heart,
  Award,
  Shield,
  Users,
  Clock,
  Truck,
  MessageCircle,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface AboutUsProps {
  onBack: () => void;
}

export default function AboutUs({ onBack }: AboutUsProps) {
  const handleWhatsApp = () => {
    const message = "Hello Happy Pills Pharmacy! I'd like to learn more about your services.";
    const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReview = () => {
    const searchUrl = 'https://www.google.com/search?q=Happy+Pills+Pharmacy+Nansana+Uganda+reviews';
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="section-container py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white section-padding">
        <div className="section-container text-center">
          <span className="badge bg-primary-50 text-primary-700 mb-6">About Us</span>
          <h1 className="heading-xl text-neutral-800 mb-6 text-balance">
            About Happy Pills Pharmacy
          </h1>
          <div className="divider mx-auto mb-8" />
          <p className="text-body-lg max-w-2xl mx-auto">
            Your trusted healthcare partner committed to providing exceptional pharmaceutical
            services across Uganda since our founding.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="badge bg-primary-50 text-primary-700 mb-4">Our Purpose</span>
            <h2 className="heading-lg text-neutral-800">Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="card p-8 md:p-10">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-4">Our Mission</h3>
              <p className="text-body">
                To provide accessible, affordable, and quality pharmaceutical care to all Ugandans,
                ensuring that healthcare is within reach for every individual and family. We strive
                to be the bridge between healthcare providers and patients, offering professional
                consultation and comprehensive medication services.
              </p>
            </div>

            {/* Vision Card */}
            <div className="card p-8 md:p-10">
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-4">Our Vision</h3>
              <p className="text-body">
                To be Uganda's leading pharmaceutical service provider, recognized for innovation,
                quality, and customer care. We envision a future where every Ugandan has access
                to the medications they need, when they need them, supported by professional
                pharmaceutical expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="badge bg-primary-50 text-primary-700 mb-4">What We Stand For</span>
            <h2 className="heading-lg text-neutral-800">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality & Safety */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-3">Quality & Safety</h3>
              <p className="text-body">
                Every medication and service meets the highest standards of quality and safety,
                ensuring customer health and satisfaction.
              </p>
            </div>

            {/* Customer First */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-3">Customer First</h3>
              <p className="text-body">
                Our customers are at the heart of everything we do. We listen, understand,
                and provide personalized pharmaceutical care.
              </p>
            </div>

            {/* Accessibility */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-3">Accessibility</h3>
              <p className="text-body">
                24/7 availability and multiple service channels ensure healthcare is always
                accessible when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="badge bg-primary-50 text-primary-700 mb-4">Our Journey</span>
              <h2 className="heading-lg text-neutral-800">Our Story</h2>
            </div>

            <div className="space-y-6">
              <p className="text-body-lg text-center">
                Happy Pills Pharmacy was founded with a simple but powerful vision: to make quality
                healthcare accessible to every Ugandan. Located at Zalex House in Nansana Trading Centre
                along the busy Kampala-Hoima Road, we strategically positioned ourselves to serve
                communities across Kampala, Wakiso, Mukono, and Jinja.
              </p>

              <div className="divider mx-auto" />

              <p className="text-body text-center">
                What started as a local pharmacy has evolved into a comprehensive healthcare partner,
                offering not just medications but professional consultations, prescription processing,
                and specialized import services for hard-to-find medications and medical devices.
              </p>

              <p className="text-body text-center">
                Our commitment to innovation led us to embrace digital services, including online
                prescription uploads, WhatsApp consultations, and secure payment processing, making
                healthcare more convenient for our busy customers.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-neutral-800">4+</p>
                <p className="text-body-sm">Regions Served</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-neutral-800">24/7</p>
                <p className="text-body-sm">Availability</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-neutral-800">100%</p>
                <p className="text-body-sm">Quality Assured</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-neutral-800">Easy</p>
                <p className="text-body-sm">WhatsApp Orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="badge bg-primary-50 text-primary-700 mb-4">Our People</span>
            <h2 className="heading-lg text-neutral-800">Our Professional Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Licensed Pharmacists */}
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-3">Licensed Pharmacists</h3>
              <p className="text-body">
                Our team of qualified pharmacists provides expert consultation, medication reviews,
                and professional guidance for all your healthcare needs.
              </p>
            </div>

            {/* Import Specialists */}
            <div className="card p-8 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Truck className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-800 mb-3">Import Specialists</h3>
              <p className="text-body">
                Specialized team members handle on-demand imports of medications and medical devices
                not readily available in the local market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-lg text-white mb-4">Ready to Experience Our Care?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
            Visit us today or get in touch for professional pharmaceutical services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsApp}
              className="btn-primary bg-green-600 hover:bg-green-700 focus:ring-green-500"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us on WhatsApp
            </button>
            <button
              onClick={handleReview}
              className="btn-secondary border-white text-white hover:bg-white/10"
            >
              <Star className="w-5 h-5 mr-2" />
              Leave a Review
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
