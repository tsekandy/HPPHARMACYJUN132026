import React from 'react';
import { X, MessageCircle, User } from 'lucide-react';

const PHARMACISTS = [
  {
    name: 'Chris',
    phone: '256702275953',
    title: 'Pharmacist',
    availability: 'Mon – Sat, 8am – 8pm',
  },
  {
    name: 'Violet',
    phone: '256756936370',
    title: 'Pharmacist',
    availability: 'Mon – Sat, 8am – 8pm',
  },
];

interface Props {
  onClose: () => void;
  message?: string;
}

export default function PharmacistPickerModal({ onClose, message }: Props) {
  const defaultMsg = "Hello Happy Pills Pharmacy! I would like to speak with a pharmacist.";

  const handleSelect = (phone: string, name: string) => {
    const text = message || `Hello ${name}! I'm reaching out from Happy Pills Pharmacy for a consultation.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Choose a Pharmacist</h2>
            <p className="text-sm text-neutral-500 mt-0.5">Connect on WhatsApp instantly</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-neutral-600" />
          </button>
        </div>

        {/* Pharmacist list */}
        <div className="p-4 space-y-3">
          {PHARMACISTS.map((p) => (
            <button
              key={p.phone}
              onClick={() => handleSelect(p.phone, p.name)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-neutral-200 hover:border-green-400 hover:bg-green-50 transition-all group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                <User className="w-6 h-6 text-primary-600 group-hover:text-green-600 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900">{p.name}</p>
                <p className="text-xs text-neutral-500">{p.title}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{p.availability}</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium flex-shrink-0">
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 pb-5">
          You'll be redirected to WhatsApp
        </p>
      </div>
    </div>
  );
}
