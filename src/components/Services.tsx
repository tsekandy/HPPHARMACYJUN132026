import React from 'react';
import { Pill, FileText, Truck, Clock, Shield, Phone, CreditCard, Smartphone, Building, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Pill className="w-7 h-7" />,
      title: 'Prescription Dispensing',
      description: 'Professional dispensing of all prescription medications with expert consultation and guidance.',
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: 'Prescription Upload & Processing',
      description: 'Upload your prescription online for quick processing and preparation. Pay securely through our platform.',
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: 'On-Demand Drug Import',
      description: 'We can import any medication or medical device not readily available locally. Contact us for quotes and timelines.',
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: '24/7 Emergency Service',
      description: 'Round-the-clock availability for emergency medication needs and urgent pharmaceutical consultations.',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Health Consultations',
      description: 'Professional pharmaceutical consultations, medication reviews, and health advice from qualified pharmacists.',
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'WhatsApp Support',
      description: 'Instant support and consultation through WhatsApp for quick medication inquiries and health questions.',
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Our Services</p>
          <h2 className="heading-lg text-neutral-900 mb-4">
            Education and care services to strengthen the patient-provider connection
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Comprehensive pharmaceutical services designed to meet all your healthcare needs with
            professional expertise and convenient digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card p-8 group hover:border-primary-200">
              <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">{service.title}</h3>
              <p className="text-body-sm mb-4">{service.description}</p>
              <button
                onClick={() => {
                  const message = `Hello Happy Pills Pharmacy! I'm interested in your ${service.title} service.`;
                  window.open(`https://wa.me/256709745309?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="text-primary-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Payment Methods</p>
            <h2 className="heading-md text-neutral-900 mb-4">Convenient payment options in Uganda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: 'Credit/Debit Cards',
                description: 'Visa, Mastercard accepted securely with international and local cards',
                color: 'bg-blue-50 text-blue-600',
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: 'Mobile Money',
                description: 'MTN Mobile Money, Airtel Money - Uganda\'s most popular payment methods',
                color: 'bg-green-50 text-green-600',
              },
              {
                icon: <Building className="w-8 h-8" />,
                title: 'Bank Transfer',
                description: 'Direct bank transfers from all major Uganda banks and online banking',
                color: 'bg-amber-50 text-amber-600',
              },
            ].map((method, i) => (
              <div key={i} className="card p-6 text-center">
                <div className={`w-16 h-16 rounded-xl ${method.color} flex items-center justify-center mx-auto mb-4`}>
                  {method.icon}
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">{method.title}</h4>
                <p className="text-body-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
