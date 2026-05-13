import React from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Navigation, Car, Bus, CheckCircle } from 'lucide-react';

interface LocationsProps {
  onBack: () => void;
}

export default function Locations({ onBack }: LocationsProps) {
  const mainLocation = {
    name: 'Happy Pills Pharmacy - Main Branch',
    address: 'Zalex House Nansana Trading Centre, Kampala-Hoima Road, Kampala',
    phone: '+256 709 745 309',
    altPhone: '+256 709 745 309',
    hours: {
      regular: 'Monday - Sunday: 7:30 AM - 12:00 AM',
      emergency: '24/7 Emergency Services Available'
    },
    services: [
      'Full Pharmaceutical Services',
      'Prescription Processing',
      'Health Consultations',
      'Emergency Services',
      'On-Demand Imports',
      'WhatsApp Support'
    ]
  };

  const serviceAreas = [
    {
      area: 'Kampala',
      description: 'Our primary service area with full delivery and consultation services',
      deliveryTime: '30-60 minutes',
      coverage: 'All areas within Kampala district'
    },
    {
      area: 'Wakiso',
      description: 'Extended service area including Nansana, Kira, and surrounding areas',
      deliveryTime: '45-90 minutes',
      coverage: 'Major towns and trading centers'
    },
    {
      area: 'Mukono',
      description: 'Service area with scheduled deliveries and pickup points',
      deliveryTime: '1-2 hours',
      coverage: 'Mukono town and major centers'
    },
    {
      area: 'Jinja',
      description: 'Extended service area with advance booking required',
      deliveryTime: '2-4 hours',
      coverage: 'Jinja city and surrounding areas'
    }
  ];

  const transportDirections = [
    {
      method: 'Private Vehicle',
      icon: <Car className="w-6 h-6 text-primary-600" />,
      directions: [
        'From Kampala City: Take Kampala-Hoima Road heading north',
        'Continue for approximately 15km to Nansana Trading Centre',
        'Look for Zalex House - we\'re on the ground floor',
        'Parking available in the trading centre'
      ]
    },
    {
      method: 'Public Transport',
      icon: <Bus className="w-6 h-6 text-primary-600" />,
      directions: [
        'Take a taxi/bus from Kampala to Nansana',
        'Alight at Nansana Trading Centre',
        'Zalex House is in the main trading area',
        'Ask for Happy Pills Pharmacy - locals know us well'
      ]
    },
    {
      method: 'Boda Boda',
      icon: <Navigation className="w-6 h-6 text-primary-600" />,
      directions: [
        'Tell the rider: "Nansana Trading Centre, Zalex House"',
        'From any location in Kampala: approximately 20,000-30,000 UGX',
        'Landmark: Near main Nansana market',
        'GPS coordinates available upon request'
      ]
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
            <MapPin className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">Our Locations & Service Areas</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-3xl mx-auto">
            Find us easily and discover all the areas we serve across Uganda.
            Professional pharmaceutical care delivered right to your doorstep.
          </p>
        </div>
      </section>

      {/* Main Location */}
      <section className="section-padding">
        <div className="section-container">
          <div className="card p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="heading-md text-neutral-900 mb-6">{mainLocation.name}</h2>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Address</h3>
                      <p className="text-body">{mainLocation.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Phone Numbers</h3>
                      <p className="text-body">{mainLocation.phone}</p>
                      <p className="text-body">{mainLocation.altPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-4 flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Operating Hours</h3>
                      <p className="text-body">{mainLocation.hours.regular}</p>
                      <p className="text-primary-600 font-medium">{mainLocation.hours.emergency}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="heading-sm text-neutral-900 mb-4">Available Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mainLocation.services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-primary-600 mr-2.5 flex-shrink-0" />
                      <span className="text-body-sm text-neutral-700">{service}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => {
                      const message = "Hello Happy Pills Pharmacy! I need directions to your location.";
                      const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Get Directions via WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      // Open Google Maps
                      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Zalex+House+Nansana+Trading+Centre+Kampala`;
                      window.open(mapsUrl, '_blank');
                    }}
                    className="btn-secondary w-full"
                  >
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Our Service Areas</h2>
          <div className="divider mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceAreas.map((area, index) => (
              <div key={index} className="card p-6">
                <h3 className="heading-sm text-neutral-900 mb-3">{area.area}</h3>
                <p className="text-body mb-5">{area.description}</p>

                <div className="space-y-3 border-t border-neutral-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">Delivery Time:</span>
                    <span className="badge bg-primary-50 text-primary-700">{area.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-neutral-700">Coverage:</span>
                    <span className="text-sm text-neutral-600">{area.coverage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation & Directions */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">How to Reach Us</h2>
          <div className="divider mx-auto mb-10" />
          <div className="max-w-3xl mx-auto card p-8">
            <div className="space-y-8">
              {transportDirections.map((transport, index) => (
                <div key={index} className="border-b border-neutral-200 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mr-3">
                      {transport.icon}
                    </div>
                    <h3 className="heading-sm text-neutral-900">{transport.method}</h3>
                  </div>
                  <ol className="space-y-2.5">
                    {transport.directions.map((direction, dirIndex) => (
                      <li key={dirIndex} className="flex items-start text-body-sm">
                        <span className="bg-primary-50 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5 flex-shrink-0">
                          {dirIndex + 1}
                        </span>
                        <span className="text-neutral-700">{direction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Directions */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Need Help Finding Us?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you with directions and location assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const message = "Hello Happy Pills Pharmacy! I need help finding your location.";
                const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Help on WhatsApp
            </button>
            <button
              onClick={() => window.location.href = 'tel:+256709745309'}
              className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Call for Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
