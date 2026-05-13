import React, { useState } from 'react';
import { ArrowLeft, Gift, Star, Trophy, Users, Heart, Percent, Crown, CheckCircle } from 'lucide-react';

interface RewardsProps {
  onBack: () => void;
}

export default function Rewards({ onBack }: RewardsProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    location: ''
  });

  const handleJoinProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Happy Pills Pharmacy! I want to join your rewards program.

Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

Please sign me up and let me know how to start earning rewards!`;

    const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const rewardTiers = [
    {
      name: 'Bronze Member',
      icon: <Gift className="w-8 h-8 text-orange-600" />,
      threshold: '0 - 500,000 UGX annually',
      benefits: [
        '2% cashback on all purchases',
        'Birthday month special discount',
        'Priority customer support',
        'Health tips and reminders'
      ],
      accentColor: 'bg-orange-50 border-orange-200',
      dotColor: 'bg-orange-500'
    },
    {
      name: 'Silver Member',
      icon: <Star className="w-8 h-8 text-neutral-500" />,
      threshold: '500,001 - 1,500,000 UGX annually',
      benefits: [
        '5% cashback on all purchases',
        'Free prescription consultations',
        'Monthly health check-ups',
        'Express prescription processing'
      ],
      accentColor: 'bg-neutral-100 border-neutral-300',
      dotColor: 'bg-neutral-400'
    },
    {
      name: 'Gold Member',
      icon: <Trophy className="w-8 h-8 text-amber-600" />,
      threshold: '1,500,001 - 3,000,000 UGX annually',
      benefits: [
        '8% cashback on all purchases',
        'Free medication delivery',
        'Exclusive health programs',
        'Priority import services'
      ],
      accentColor: 'bg-amber-50 border-amber-200',
      dotColor: 'bg-amber-500'
    },
    {
      name: 'Platinum Member',
      icon: <Crown className="w-8 h-8 text-primary-600" />,
      threshold: '3,000,001+ UGX annually',
      benefits: [
        '12% cashback on all purchases',
        'Personal pharmacist assigned',
        'VIP health consultations',
        'Complimentary health screening'
      ],
      accentColor: 'bg-primary-50 border-primary-200',
      dotColor: 'bg-primary-600'
    }
  ];

  const earningMethods = [
    {
      icon: <Gift className="w-10 h-10 text-primary-600" />,
      title: 'Make Purchases',
      description: 'Earn 1 point for every 10,000 UGX spent on medications and health products.',
      points: '10,000 UGX = 1 Point'
    },
    {
      icon: <Users className="w-10 h-10 text-primary-600" />,
      title: 'Refer Friends',
      description: 'Get bonus points when you refer friends and family to Happy Pills Pharmacy.',
      points: '2 Points per Referral'
    },
    {
      icon: <Star className="w-10 h-10 text-amber-500" />,
      title: 'Leave Reviews',
      description: 'Share your experience on Google Reviews and earn reward points.',
      points: '3 Points per Review'
    },
    {
      icon: <Heart className="w-10 h-10 text-primary-600" />,
      title: 'Health Programs',
      description: 'Participate in our health and wellness programs for extra points.',
      points: '2 Points per Program'
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
            <Gift className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">Happy Pills Rewards Program</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-3xl mx-auto">
            Earn points, unlock rewards, and enjoy exclusive benefits with every purchase.
            The more you spend on your health, the more you save!
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="section-padding">
        <div className="section-container">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4">
                  <Percent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Up to 12%</h3>
                <p className="text-primary-100">Cashback on purchases</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">500+</h3>
                <p className="text-primary-100">Happy members</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-primary-100">To join & participate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Membership Tiers</h2>
          <div className="divider mx-auto mb-4" />
          <p className="text-body text-center mb-10 max-w-2xl mx-auto">
            Membership tiers are based on your total annual purchases at Happy Pills Pharmacy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTiers.map((tier, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                  {tier.icon}
                </div>
                <h3 className="heading-sm text-neutral-900 mb-2">{tier.name}</h3>
                <p className="text-body-sm mb-5 font-medium">{tier.threshold}</p>

                <ul className="space-y-2.5 text-sm text-left">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <div className={`w-2 h-2 ${tier.dotColor} rounded-full mt-2 mr-2.5 flex-shrink-0`}></div>
                      <span className="text-neutral-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Earn Points */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">How to Earn Points</h2>
          <div className="divider mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {earningMethods.map((method, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mr-4 flex-shrink-0">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm text-neutral-900 mb-2">{method.title}</h3>
                    <p className="text-body mb-3">{method.description}</p>
                    <span className="badge bg-primary-50 text-primary-700">
                      {method.points}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Program Form */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-md text-neutral-900 mb-2 text-center">Join the Rewards Program</h2>
            <div className="divider mx-auto mb-8" />

            {/* Google Form Link */}
            <div className="text-center mb-6">
              <button
                onClick={() => window.open('https://docs.google.com/forms/d/1_4QIt-ixM21p9i-WdJ1n3JAMlL-2b6udWaFj9PafVp0/edit', '_blank')}
                className="btn-primary"
              >
                Complete Registration Form
              </button>
              <p className="text-body-sm mt-3">Or fill out the form below to get started</p>
            </div>

            <form onSubmit={handleJoinProgram} className="card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field"
                    placeholder="+256..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="input-field"
                    placeholder="your@email.com (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.location}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field"
                    placeholder="City, District, Uganda"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full text-lg py-3.5"
              >
                Join Rewards Program
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Program Terms */}
      <section className="section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto card p-6">
            <h3 className="heading-sm text-neutral-900 mb-4">Program Terms & Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-2.5">
                  {[
                    'Membership is free and open to all customers',
                    'Points expire after 12 months of inactivity',
                    'Minimum 25 points required for redemption',
                    'Cashback credited within 24 hours'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-body-sm">
                      <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 mr-2.5 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-2.5">
                  {[
                    'Tier status reviewed monthly',
                    'Benefits apply immediately upon tier qualification',
                    'Points cannot be transferred between accounts',
                    'Program terms subject to change with notice'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-body-sm">
                      <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 mr-2.5 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Questions About Rewards?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us to learn more about earning and redeeming rewards.
          </p>
          <button
            onClick={() => {
              const message = "Hello Happy Pills Pharmacy! I have questions about your rewards program.";
              const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Contact Us on WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}
