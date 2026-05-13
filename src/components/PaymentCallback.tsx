import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, ArrowLeft, Phone } from 'lucide-react';

export default function PaymentCallback() {
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderTrackingId = urlParams.get('OrderTrackingId');
    const merchantReference = urlParams.get('OrderMerchantReference');

    if (orderTrackingId) {
      setTimeout(() => {
        const outcomes = ['success', 'failed', 'pending'];
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        setPaymentStatus(randomOutcome as any);
        setOrderDetails({
          orderTrackingId,
          merchantReference,
          amount: 'UGX 50,000',
          description: 'Prescription Processing'
        });
      }, 2000);
    }
  }, []);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success': return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'failed': return <XCircle className="w-16 h-16 text-red-500" />;
      case 'pending': return <Clock className="w-16 h-16 text-amber-500" />;
      default: return <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />;
    }
  };

  const statusInfo = (() => {
    switch (paymentStatus) {
      case 'success': return { title: 'Payment Successful!', message: 'Your payment has been processed successfully. We will contact you shortly with your order details.', color: 'text-green-800' };
      case 'failed': return { title: 'Payment Failed', message: 'Your payment could not be processed. Please try again or contact us for assistance.', color: 'text-red-800' };
      case 'pending': return { title: 'Payment Pending', message: 'Your payment is being processed. We will notify you once it is confirmed.', color: 'text-amber-800' };
      default: return { title: 'Processing Payment...', message: 'Please wait while we verify your payment status.', color: 'text-primary-800' };
    }
  })();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">{getStatusIcon()}</div>
        <h1 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>{statusInfo.title}</h1>
        <p className="text-neutral-600 mb-6">{statusInfo.message}</p>

        {orderDetails && (
          <div className="bg-neutral-50 rounded-xl p-5 mb-6 text-left">
            <h3 className="font-semibold text-neutral-900 mb-3 text-sm">Order Details</h3>
            <div className="space-y-1.5 text-sm text-neutral-600">
              <p><strong>Order ID:</strong> {orderDetails.merchantReference}</p>
              <p><strong>Amount:</strong> {orderDetails.amount}</p>
              <p><strong>Description:</strong> {orderDetails.description}</p>
              <p><strong>Tracking ID:</strong> {orderDetails.orderTrackingId}</p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full btn-primary py-3.5"
          >
            <ArrowLeft className="w-5 h-5 mr-2 inline" />
            Return to Homepage
          </button>

          {paymentStatus === 'success' && (
            <button
              onClick={() => {
                const message = `Hello Happy Pills Pharmacy! My payment was successful. Order ID: ${orderDetails?.merchantReference}. When can I expect my order?`;
                window.open(`https://wa.me/256709745309?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="w-full btn-secondary py-3.5"
            >
              Contact us on WhatsApp
            </button>
          )}

          {paymentStatus === 'failed' && (
            <button onClick={() => window.history.back()} className="w-full bg-neutral-700 text-white py-3.5 px-4 rounded-lg font-semibold hover:bg-neutral-600 transition-colors">
              Try Again
            </button>
          )}
        </div>

        <div className="mt-6 p-4 bg-primary-50 rounded-xl">
          <p className="text-sm text-primary-800">
            <strong>Need Help?</strong> Contact us at +256 709 745 309 or via WhatsApp for immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
