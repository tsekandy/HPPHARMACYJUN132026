import React, { useState } from 'react';
import { Zap, MessageCircle, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';

interface MedicineEntry {
  medicineName: string;
  dosage: string;
  quantity: string;
}

interface RequestForm {
  medicines: MedicineEntry[];
  customerName: string;
  phone: string;
  email: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  notes: string;
}

const emptyMedicine = (): MedicineEntry => ({ medicineName: '', dosage: '', quantity: '' });

export default function SpecialtyMedicineRequest() {
  const [formData, setFormData] = useState<RequestForm>({
    medicines: [emptyMedicine()],
    customerName: '',
    phone: '',
    email: '',
    urgency: 'routine',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const handleMedicineChange = (index: number, field: keyof MedicineEntry, value: string) => {
    setFormData(prev => {
      const updated = [...prev.medicines];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, medicines: updated };
    });
  };

  const addMedicine = () => {
    setFormData(prev => ({ ...prev, medicines: [...prev.medicines, emptyMedicine()] }));
  };

  const removeMedicine = (index: number) => {
    setFormData(prev => ({ ...prev, medicines: prev.medicines.filter((_, i) => i !== index) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const medList = formData.medicines
        .filter(m => m.medicineName.trim())
        .map((m, i) =>
          `${i + 1}. ${m.medicineName}${m.dosage ? ` — ${m.dosage}` : ''}${m.quantity ? ` (Qty: ${m.quantity})` : ''}`
        )
        .join('\n');

      const message = `Hi, I would like to request the following medicine${formData.medicines.length > 1 ? 's' : ''}:\n\n${medList}\n\nUrgency: ${formData.urgency}\nCustomer: ${formData.customerName}\nPhone: ${formData.phone}\n\nAdditional notes: ${formData.notes}`;
      setWhatsAppMessage(message);
      setShowWhatsAppPicker(true);

      setShowSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          medicines: [emptyMedicine()],
          customerName: '',
          phone: '',
          email: '',
          urgency: 'routine',
          notes: '',
        });
      }, 3000);
    }, 800);
  };

  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">
            <Zap className="w-4 h-4 inline mr-2" />
            Hard-to-Find Medicines
          </p>
          <h2 className="heading-lg text-neutral-900 mb-4">Request Specialty Medicines</h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Can't find a medicine you need? Our pharmacy specializes in sourcing rare and hard-to-find medications. Submit your request and we'll provide a quote within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: '24-Hour Quote',
              description: 'We provide pricing quotes within 24 hours of your request',
            },
            {
              icon: <MessageCircle className="w-6 h-6" />,
              title: 'Direct Communication',
              description: 'Get updates via WhatsApp or SMS throughout the process',
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: 'Guaranteed Sourcing',
              description: 'Access to international pharmaceutical suppliers',
            },
          ].map((item, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-neutral-50 rounded-2xl p-8">
          {showSuccess ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="heading-sm text-green-800 mb-2">Request Submitted!</h3>
              <p className="text-neutral-700 mb-4">
                Our team will contact you shortly with a quote. Continue on WhatsApp for faster communication.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Medicine Details */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Medicine Details</h3>
                  <span className="text-xs text-neutral-500">{formData.medicines.length} medicine{formData.medicines.length !== 1 ? 's' : ''}</span>
                </div>

                <div className="space-y-3">
                  {formData.medicines.map((med, index) => (
                    <div key={index} className="bg-white rounded-xl border border-neutral-200 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                          Medicine {index + 1}
                        </span>
                        {formData.medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicine(index)}
                            className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Medicine Name *"
                          value={med.medicineName}
                          onChange={(e) => handleMedicineChange(index, 'medicineName', e.target.value)}
                          required={index === 0}
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Dosage (e.g., 500mg)"
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="Quantity Needed"
                          value={med.quantity}
                          onChange={(e) => handleMedicineChange(index, 'quantity', e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addMedicine}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary-300 text-primary-600 font-medium text-sm rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Medicine
                </button>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Full Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Urgency & Notes */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-4">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Urgency Level</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="routine">Routine (Standard Processing)</option>
                      <option value="urgent">Urgent (Within 48 hours)</option>
                      <option value="emergency">Emergency (Within 24 hours)</option>
                    </select>
                  </div>
                </div>

                <label className="block text-sm font-medium text-neutral-700 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  placeholder="Any special requirements, alternative medications, or additional information..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              {/* Info Alert */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  After submission, you'll be connected to WhatsApp for direct communication with our pharmacy team.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-base disabled:opacity-50"
              >
                <Zap className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting...' : `Submit Request${formData.medicines.length > 1 ? ` (${formData.medicines.filter(m => m.medicineName.trim()).length} medicines)` : ''}`}
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="heading-md text-neutral-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to source a specialty medicine?',
                a: 'Most medicines are sourced within 2-7 days depending on availability and location. Emergency requests can be expedited.',
              },
              {
                q: 'Can I request multiple medicines at once?',
                a: 'Yes! Use the "Add Another Medicine" button to include all the medicines you need in a single request. We\'ll source and quote them together.',
              },
              {
                q: 'What if the medicine is not available anywhere?',
                a: 'We\'ll inform you immediately and suggest alternative medications that may serve the same purpose.',
              },
              {
                q: 'Can you import medicines from other countries?',
                a: 'Yes, we work with international suppliers and can import medicines with proper documentation and regulatory approval.',
              },
              {
                q: 'Do you arrange delivery for specialty medicines?',
                a: 'Absolutely! We deliver to Kampala, Wakiso, Mukono, and Jinja with tracking updates via WhatsApp.',
              },
            ].map((item, i) => (
              <details key={i} className="card p-6 group cursor-pointer">
                <summary className="font-semibold text-neutral-900 flex justify-between items-center">
                  {item.q}
                  <span className="text-primary-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-neutral-600 mt-3 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="Submit Request via WhatsApp"
        />
      )}
    </section>
  );
}
