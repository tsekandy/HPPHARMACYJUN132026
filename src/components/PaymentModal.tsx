import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    amount: number;
    description: string;
    reference: string;
  };
}

export default function PaymentModal({ isOpen, onClose, orderDetails }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const paymentData = {
        amount: orderDetails.amount,
        currency: 'UGX',
        description: orderDetails.description,
        callback_url: `${window.location.origin}/payment-callback`,
        notification_id: orderDetails.reference,
        billing_address: {
          email_address: customerDetails.email,
          phone_number: customerDetails.phone,
          country_code: 'UG',
          first_name: customerDetails.firstName,
          middle_name: '',
          last_name: customerDetails.lastName,
          line_1: '',
          line_2: '',
          city: '',
          state: '',
          postal_code: '',
          zip_code: ''
        }
      };

      const response = await fetch('/api/pesapal/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      if (result.success && result.redirect_url) {
        window.location.href = result.redirect_url;
      } else {
        alert('Payment initialization failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = customerDetails.firstName &&
                     customerDetails.lastName &&
                     customerDetails.email &&
                     customerDetails.phone;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-sm text-neutral-900">Complete Payment</h2>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-neutral-50 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-neutral-900 text-sm mb-3">Order Summary</h3>
            <p className="text-neutral-600 text-sm mb-3">{orderDetails.description}</p>
            <div className="flex justify-between items-center font-bold text-lg border-t border-neutral-200 pt-3">
              <span className="text-neutral-900">Total:</span>
              <span className="text-primary-600">UGX {orderDetails.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-5 mb-8">
            <h3 className="font-semibold text-neutral-900">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={customerDetails.firstName}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, firstName: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Last Name *</label>
                <input
                  type="text"
                  value={customerDetails.lastName}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, lastName: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+256..."
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="font-semibold text-neutral-900 mb-4">Available Payment Methods</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center p-3 border border-neutral-200 rounded-xl">
                <CreditCard className="w-7 h-7 text-blue-600 mb-2" />
                <span className="text-xs text-neutral-600 text-center">Cards</span>
              </div>
              <div className="flex flex-col items-center p-3 border border-neutral-200 rounded-xl">
                <Smartphone className="w-7 h-7 text-green-600 mb-2" />
                <span className="text-xs text-neutral-600 text-center">Mobile Money</span>
              </div>
              <div className="flex flex-col items-center p-3 border border-neutral-200 rounded-xl">
                <Building className="w-7 h-7 text-amber-600 mb-2" />
                <span className="text-xs text-neutral-600 text-center">Bank</span>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={!isFormValid || isProcessing}
            className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : `Pay UGX ${orderDetails.amount.toLocaleString()}`}
          </button>

          <p className="text-xs text-neutral-400 text-center mt-4">
            Secure payment powered by Pesapal. Your payment information is encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
