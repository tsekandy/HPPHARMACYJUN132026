import React from 'react';
import { X, Shield } from 'lucide-react';

interface PesapalPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function PesapalPaymentModal({ isOpen, onClose, amount }: PesapalPaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-sm text-neutral-900">Complete Payment</h2>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-neutral-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 text-center">
              Secure Payment Gateway
            </h3>
            <div className="flex justify-center">
              <iframe
                width="400"
                height="300"
                src="https://store.pesapal.com/embed-code?pageUrl=https://store.pesapal.com/happypillspharmacylimited"
                frameBorder="0"
                allowFullScreen
                className="border border-neutral-200 rounded-xl shadow-sm"
                title="Pesapal Payment Gateway"
              ></iframe>
            </div>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
            <h4 className="font-semibold text-primary-800 mb-3 text-sm">Payment Information:</h4>
            <ul className="text-sm text-primary-700 space-y-1.5">
              <li className="flex gap-2"><span>•</span> Accepts all major credit and debit cards</li>
              <li className="flex gap-2"><span>•</span> Secure SSL encrypted payment processing</li>
              <li className="flex gap-2"><span>•</span> Mobile money integration available</li>
              <li className="flex gap-2"><span>•</span> Bank transfer options supported</li>
              <li className="flex gap-2"><span>•</span> Payment confirmation sent via SMS/Email</li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-4">Need help with your payment?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  const message = "Hello Happy Pills Pharmacy! I need help with my payment on the Pesapal gateway.";
                  window.open(`https://wa.me/256709745309?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="btn-primary text-sm py-2.5"
              >
                WhatsApp Support
              </button>
              <button
                onClick={() => window.location.href = 'tel:+256709745309'}
                className="btn-secondary text-sm py-2.5"
              >
                Call Us
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 text-center mt-4">
            Secure payment powered by Pesapal. Your payment information is encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
