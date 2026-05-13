import React from 'react';
import { ArrowLeft, Heart, Shield, Clock, CheckCircle, AlertCircle, CreditCard, Phone, Mail } from 'lucide-react';

interface DrugFundProps {
  onBack: () => void;
}

export default function DrugFund({ onBack }: DrugFundProps) {
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
            <Heart className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">Happy Pills Pharmacy Drug Fund Scheme</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-3xl mx-auto">
            A prepaid medication service designed to ensure uninterrupted access to essential pharmaceutical products.
            Register and prepay for your medications in advance.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Scheme Benefits</h2>
          <div className="divider mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-900 mb-2">Guaranteed Access</h3>
              <p className="text-body-sm">Ensure continuous access to your essential medications</p>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-900 mb-2">Flexible Payments</h3>
              <p className="text-body-sm">Pay via mobile money, bank transfer, or cash deposits</p>
            </div>

            <div className="card p-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="heading-sm text-neutral-900 mb-2">12-Month Validity</h3>
              <p className="text-body-sm">Your prepaid balance remains active for 12 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-md text-neutral-900 mb-2 text-center">Terms and Conditions</h2>
            <div className="divider mx-auto mb-8" />

            <div className="card p-8">
              {/* Introduction */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">1. Introduction</h3>
                <p className="text-body leading-relaxed">
                  The Happy Pills Pharmacy Drug Fund Scheme ("the Scheme") is a prepaid medication service designed to allow clients to register and prepay for medications in advance, ensuring uninterrupted access to essential pharmaceutical products. By enrolling in the Scheme, clients agree to the terms and conditions outlined below.
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">2. Eligibility</h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>The Scheme is open to all individuals aged 18 years and above. Minors may enroll under the supervision of a parent or legal guardian.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Participants must provide accurate personal and contact details during registration.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Enrollment is subject to approval by Happy Pills Pharmacy.</span>
                  </li>
                </ul>
              </div>

              {/* Registration and Prepayment */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">3. Registration and Prepayment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Clients must complete the registration process via the designated online form or in-person at Happy Pills Pharmacy.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Prepayments must be made using approved payment methods, including mobile money, bank transfer, or cash deposits.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Upon successful prepayment, clients will receive a confirmation receipt and a record of their prepaid balance.</span>
                  </li>
                </ul>
              </div>

              {/* Access to Medications */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">4. Access to Medications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Clients can redeem their prepaid balance for medications available at Happy Pills Pharmacy at any time during the scheme period.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>Medications are subject to availability and regulatory requirements. The Pharmacy will make reasonable efforts to ensure stock availability.</span>
                  </li>
                  <li className="flex items-start text-body">
                    <AlertCircle className="w-5 h-5 text-amber-500 mr-2.5 mt-0.5 flex-shrink-0" />
                    <span>The Scheme does not cover controlled substances or prescription-only medicines without a valid prescription.</span>
                  </li>
                </ul>
              </div>

              {/* Scheme Duration and Expiry */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">5. Scheme Duration and Expiry</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <ul className="space-y-3">
                    <li className="flex items-start text-body">
                      <Clock className="w-5 h-5 text-amber-600 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">The Scheme operates on a rolling basis, with a minimum participation period of three (3) months.</span>
                    </li>
                    <li className="flex items-start text-body">
                      <AlertCircle className="w-5 h-5 text-amber-600 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">Any unused balance must be redeemed within twelve (12) months from the date of payment. Unclaimed balances may be forfeited unless otherwise extended by the Pharmacy.</span>
                    </li>
                    <li className="flex items-start text-body">
                      <AlertCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">The account shall remain active within 12 months; if no activity occurs, any unused balance may be forfeited without prior explanation.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Refund and Cancellation Policy */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">6. Refund and Cancellation Policy</h3>
                <ul className="space-y-3">
                  {[
                    'Clients may cancel their enrollment by submitting a written request to Happy Pills Pharmacy.',
                    'Refunds will be processed within fourteen (14) business days, subject to a processing fee of 5% of the prepaid amount.',
                    'Refunds will not be issued for amounts already utilized to procure medications.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-body">
                      <CheckCircle className="w-5 h-5 text-primary-600 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrears and Debt Collection */}
              <div className="mb-8">
                <h3 className="heading-sm text-neutral-900 mb-3">9. Arrears and Debt Collections</h3>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Notification Process:</h4>
                      <ul className="space-y-1.5 text-neutral-700 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          First Reminder: 14 days before due date
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          Second Reminder: 21 days after due date
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          Final Notice: 45 days after due date (5% monthly interest begins)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Penalties for Unpaid Arrears:</h4>
                      <ul className="space-y-1.5 text-neutral-700 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          Late Fee: 5% of overdue amount (monthly until cleared)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          Suspension: Access lost after 45 days
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-2.5 flex-shrink-0"></span>
                          Forfeiture: Cancellation and loss of balance after 90 days
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy and Data Protection */}
              <div>
                <h3 className="heading-sm text-neutral-900 mb-3">8. Privacy and Data Protection</h3>
                <p className="text-body leading-relaxed mb-3">
                  By enrolling in the Scheme, clients consent to the collection and processing of their personal data for the purpose of administering the Scheme.
                </p>
                <p className="text-body leading-relaxed">
                  Happy Pills Pharmacy will maintain the confidentiality of all client information and will not share personal data with third parties without explicit consent, except as required by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Contact Information</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            For any inquiries, complaints, or assistance regarding the Scheme:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">Phone</h3>
              <p className="text-primary-100">0709 745 309</p>
              <p className="text-primary-100">0702 275 953</p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">Email</h3>
              <p className="text-primary-100">happypillspharmacy@gmail.com</p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-1">Location</h3>
              <p className="text-primary-100">Zalex House, Nansana</p>
              <p className="text-primary-100">Kampala-Hoima Road</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                const message = "Hello Happy Pills Pharmacy! I'm interested in joining the Drug Fund Scheme. Please provide me with more information.";
                const whatsappUrl = `https://wa.me/256709745309?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Join Drug Fund Scheme
            </button>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container text-center">
          <p className="text-body-sm max-w-2xl mx-auto">
            By enrolling in the Happy Pills Pharmacy Drug Fund Scheme, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
          </p>
          <p className="text-neutral-900 font-medium mt-2">
            Management of Happy Pills Pharmacy - 2025
          </p>
        </div>
      </section>
    </div>
  );
}
