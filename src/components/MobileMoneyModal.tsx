import React from 'react';
import { X, Phone, Copy } from 'lucide-react';

interface MobileMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMoneyModal({ isOpen, onClose }: MobileMoneyModalProps) {
  if (!isOpen) return null;

  const handleCopyCode = (code: string, provider: string) => {
    navigator.clipboard.writeText(code);
    alert(`${provider} code copied to clipboard!`);
  };

  const handleDialCode = (code: string) => {
    window.location.href = `tel:${code}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="heading-sm text-neutral-900">Mobile Money Payment</h2>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-body mb-8 text-center">
            Pay with the details below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* MTN */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MTN</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">MTN Mobile Money</h3>
                  <p className="text-xs text-neutral-500">MTN MoMo</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs font-medium text-neutral-700 mb-2">Payment Code:</p>
                <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-lg">
                  <code className="text-sm font-mono text-neutral-800">*165*3# then 308115</code>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleCopyCode('*165*3# then 308115', 'MTN')}
                      className="p-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDialCode('*165*3#')}
                      className="p-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Airtel */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AIRTEL</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">Airtel Money</h3>
                  <p className="text-xs text-neutral-500">Fast and secure</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-red-200">
                <p className="text-xs font-medium text-neutral-700 mb-2">Payment Code:</p>
                <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-lg">
                  <code className="text-sm font-mono text-neutral-800">*185*9# then 1115061</code>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleCopyCode('*185*9# then 1115061', 'Airtel')}
                      className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-500/90 transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDialCode('*185*9#')}
                      className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-500/90 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-6">
            <h4 className="font-semibold text-primary-800 mb-3 text-sm">Payment Instructions:</h4>
            <ol className="text-sm text-primary-700 space-y-1.5">
              <li className="flex gap-2"><span className="font-semibold">1.</span> Dial the code for your mobile money provider</li>
              <li className="flex gap-2"><span className="font-semibold">2.</span> Enter the merchant code when prompted</li>
              <li className="flex gap-2"><span className="font-semibold">3.</span> Enter the amount you wish to pay</li>
              <li className="flex gap-2"><span className="font-semibold">4.</span> Confirm the payment with your PIN</li>
              <li className="flex gap-2"><span className="font-semibold">5.</span> Take a screenshot of the confirmation</li>
            </ol>
          </div>

          {/* Support */}
          <div className="text-center">
            <p className="text-sm text-neutral-500 mb-4">Need help with your payment?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  const message = "Hello Happy Pills Pharmacy! I need help with mobile money payment.";
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
        </div>
      </div>
    </div>
  );
}
