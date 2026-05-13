import React, { useState } from 'react';
import { Upload, FileText, X, Mail, CheckCircle, Loader } from 'lucide-react';
import PaymentModal from './PaymentModal';
import WhatsAppPickerModal from './WhatsAppPickerModal';
import { analyzePrescritionImage, formatPrescriptionForMessage, type PrescriptionAnalysis } from '../utils/prescriptionAnalysis';

export default function PrescriptionUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadReference, setUploadReference] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [orderDetails, setOrderDetails] = useState({ amount: 0, description: '', reference: '' });
  const [prescriptionAnalyses, setPrescriptionAnalyses] = useState<Map<number, PrescriptionAnalysis>>(new Map());
  const [analysisErrors, setAnalysisErrors] = useState<Map<number, string>>(new Map());

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const validExt = /\.(jpg|jpeg|png|webp|pdf)$/i;
    const files = Array.from(e.dataTransfer.files).filter(
      f => (validTypes.includes(f.type) || validExt.test(f.name)) && f.size <= 10 * 1024 * 1024
    );
    if (files.length !== e.dataTransfer.files.length) {
      alert('Some files were rejected. Please use JPG, PNG, WEBP, or PDF files under 10MB.');
    }
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    handleFilesAdded(newFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const validExt = /\.(jpg|jpeg|png|webp|pdf)$/i;
    const files = Array.from(e.target.files).filter(
      f => (validTypes.includes(f.type) || validExt.test(f.name)) && f.size <= 10 * 1024 * 1024
    );
    if (files.length !== e.target.files.length) {
      alert('Some files were rejected. Please use JPG, PNG, WEBP, or PDF files under 10MB.');
    }
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    handleFilesAdded(newFiles);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    const newAnalyses = new Map(prescriptionAnalyses);
    newAnalyses.delete(index);
    setPrescriptionAnalyses(newAnalyses);
    const newErrors = new Map(analysisErrors);
    newErrors.delete(index);
    setAnalysisErrors(newErrors);
  };

  const analyzeFile = async (file: File, index: number) => {
    try {
      setIsAnalyzing(true);
      const analysis = await analyzePrescritionImage(file);
      setPrescriptionAnalyses(prev => new Map(prev).set(index, analysis));
      setAnalysisErrors(prev => {
        const newErrors = new Map(prev);
        newErrors.delete(index);
        return newErrors;
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze prescription';
      setAnalysisErrors(prev => new Map(prev).set(index, errorMessage));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFilesAdded = (newFiles: File[]) => {
    newFiles.forEach((file, index) => {
      const fileIndex = uploadedFiles.length + index;
      setTimeout(() => {
        analyzeFile(file, fileIndex);
      }, 300);
    });
  };

  const handleUploadToEmail = async () => {
    if (uploadedFiles.length === 0) { alert('Please select files to upload first'); return; }
    setIsUploading(true);
    try {
      const formData = new FormData();
      const reference = `HP-${Date.now()}`;
      uploadedFiles.forEach((file) => formData.append('prescriptions', file));
      formData.append('reference', reference);
      formData.append('customerName', customerInfo.name);
      formData.append('customerPhone', customerInfo.phone);
      formData.append('customerEmail', customerInfo.email);
      const response = await fetch('/api/upload-prescription', { method: 'POST', body: formData });
      const result = await response.json();
      if (result.success) {
        setUploadSuccess(true);
        setUploadReference(result.reference);
        setTimeout(() => shareViaWhatsAppWithFiles(result.files, result.reference), 1000);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleProceedToPayment = () => {
    const estimatedCost = uploadedFiles.length * 25000;
    const reference = `HP-${Date.now()}`;
    setOrderDetails({
      amount: estimatedCost,
      description: `Prescription Processing (${uploadedFiles.length} prescription${uploadedFiles.length > 1 ? 's' : ''})`,
      reference,
    });
    setShowPayment(true);
  };

  const openWhatsAppPicker = (msg: string) => {
    setWhatsAppMessage(msg);
    setShowWhatsAppPicker(true);
  };

  const shareViaWhatsApp = () => {
    const reference = uploadReference || `HP-${Date.now()}`;
    let message = `Hello Happy Pills Pharmacy! I have uploaded ${uploadedFiles.length} prescription${uploadedFiles.length > 1 ? 's' : ''} on your website.\n\nReference: ${reference}\nCustomer: ${customerInfo.name || 'Not provided'}\nPhone: ${customerInfo.phone || 'Not provided'}\n\n`;
    const prescriptionData = formatPrescriptionForMessage(Array.from(prescriptionAnalyses.values()));
    if (prescriptionData.trim()) message += `Extracted Information:\n${prescriptionData}\n`;
    message += 'Please review and let me know the next steps.';
    openWhatsAppPicker(message);
  };

  const shareViaWhatsAppWithFiles = (fileInfo: any[], reference: string) => {
    const fileList = fileInfo.map(f => `- ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`).join('\n');
    let message = `Hello Happy Pills Pharmacy! I have uploaded ${fileInfo.length} prescription file${fileInfo.length > 1 ? 's' : ''} to your email.\n\nReference: ${reference}\nCustomer: ${customerInfo.name || 'Not provided'}\nPhone: ${customerInfo.phone || 'Not provided'}\n\nFiles:\n${fileList}\n\n`;
    const prescriptionData = formatPrescriptionForMessage(Array.from(prescriptionAnalyses.values()));
    if (prescriptionData.trim()) message += `Extracted Information:\n${prescriptionData}\n`;
    message += 'Please review and let me know the next steps.';
    openWhatsAppPicker(message);
  };

  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Prescription Upload</p>
        <h2 className="heading-lg text-neutral-900 mb-4">Upload your prescription for processing</h2>
        <p className="text-body-lg max-w-xl mx-auto">
          Upload your prescription images or PDF files for professional processing and secure payment.
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 hover:border-primary-400 bg-neutral-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-5">
          <Upload className="w-8 h-8" />
        </div>
        <p className="text-lg font-semibold text-neutral-800 mb-2">
          Drag and drop your prescription files here
        </p>
        <p className="text-neutral-500 mb-5">or</p>
        <label className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Choose Files</span>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
        <p className="text-xs text-neutral-400 mt-4">
          Supports: JPG, JPEG, PNG, WEBP, PDF (Max 10MB per file)
        </p>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          {/* Customer Information */}
          <div className="bg-neutral-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Customer Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>

          <h3 className="font-semibold text-neutral-900 mb-4">Uploaded Files ({uploadedFiles.length})</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => {
              const analysis = prescriptionAnalyses.get(index);
              const error = analysisErrors.get(index);

              return (
                <div key={index} className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 text-sm">{file.name}</p>
                        <p className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        {(isAnalyzing && !analysis && !error) && (
                          <p className="text-xs text-primary-600 mt-1 flex items-center gap-1">
                            <Loader className="w-3 h-3 animate-spin" />
                            Analyzing prescription...
                          </p>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-neutral-400 hover:text-red-500 transition-colors p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {analysis && (
                    <div className="bg-primary-50 border-t border-neutral-200 p-4 space-y-3">
                      {analysis.condition && analysis.condition !== 'Not clearly visible' && (
                        <div>
                          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Condition</p>
                          <p className="text-sm text-neutral-700">{analysis.condition}</p>
                        </div>
                      )}

                      {analysis.medicines && analysis.medicines.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-2">Medicines</p>
                          <div className="space-y-2">
                            {analysis.medicines.map((med, i) => (
                              med.name && med.name !== 'Not clearly visible' && (
                                <div key={i} className="text-sm bg-white p-2 rounded border border-neutral-200">
                                  <p className="font-medium text-neutral-900">{med.name}</p>
                                  {med.dosage && med.dosage !== 'Not clearly visible' && (
                                    <p className="text-xs text-neutral-600">Dosage: {med.dosage}</p>
                                  )}
                                  {med.quantity && med.quantity !== 'Not clearly visible' && (
                                    <p className="text-xs text-neutral-600">Quantity: {med.quantity}</p>
                                  )}
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {analysis.instructions && analysis.instructions !== 'Not clearly visible' && (
                        <div>
                          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide mb-1">Instructions</p>
                          <p className="text-sm text-neutral-700">{analysis.instructions}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="bg-orange-50 border-t border-neutral-200 p-4">
                      <p className="text-sm text-orange-700">Could not auto-analyze: {error}</p>
                      <p className="text-xs text-orange-600 mt-1">The prescription will still be sent to the pharmacy for manual review.</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          {!uploadSuccess ? (
            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  const subject = encodeURIComponent(`New Prescription Upload - HP-${Date.now()}`);
                  const body = encodeURIComponent(`Hello Happy Pills Pharmacy,\n\nI have ${uploadedFiles.length} prescription file(s) to upload for processing.\n\nCustomer: ${customerInfo.name || 'Not provided'}\nPhone: ${customerInfo.phone || 'Not provided'}\nEmail: ${customerInfo.email || 'Not provided'}\n\nPlease find the prescription files attached.`);
                  window.open(`https://mail.google.com/mail/?view=cm&to=happypillspharmacy@gmail.com&su=${subject}&body=${body}`, '_blank');
                  handleUploadToEmail();
                }}
                disabled={isUploading}
                className="btn-primary w-full py-4 text-base disabled:opacity-50"
              >
                <Mail className="w-5 h-5 mr-2" />
                {isUploading ? 'Processing...' : 'Upload & Send via Email'}
              </button>
              <button
                onClick={shareViaWhatsApp}
                className="btn-secondary w-full py-4 text-base"
              >
                Consult via WhatsApp
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-1">Files Sent Successfully!</h3>
                <p className="text-green-700 text-sm">
                  Your prescription files have been sent to happypillspharmacy@gmail.com
                </p>
                <p className="text-green-600 text-xs mt-1">Reference: {uploadReference}</p>
              </div>
              <button
                onClick={shareViaWhatsApp}
                className="btn-primary w-full py-4 text-base"
              >
                Continue on WhatsApp
              </button>
            </div>
          )}

          <div className="mt-6 p-5 bg-primary-50 border border-primary-100 rounded-xl">
            <p className="text-sm text-primary-800">
              <strong>Service Process:</strong> After uploading, our qualified pharmacists will review your prescription files,
              prepare your medication, and contact you for pickup or delivery arrangements.
            </p>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        orderDetails={orderDetails}
      />

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="Send Prescription via WhatsApp"
        />
      )}
    </div>
  );
}
