import React, { useState, useRef, useEffect } from 'react';
import { Search, Pill, Loader, AlertCircle } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  inStock: boolean;
}

const MOCK_MEDICINES: Medicine[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Pain Relief', description: 'Over-the-counter pain reliever', inStock: true },
  { id: '2', name: 'Amoxicillin 250mg', category: 'Antibiotics', description: 'Broad-spectrum antibiotic', inStock: true },
  { id: '3', name: 'Ibuprofen 200mg', category: 'Pain Relief', description: 'Anti-inflammatory pain reliever', inStock: true },
  { id: '4', name: 'Metformin 500mg', category: 'Chronic Care', description: 'Diabetes management', inStock: true },
  { id: '5', name: 'Lisinopril 10mg', category: 'Chronic Care', description: 'Blood pressure control', inStock: true },
  { id: '6', name: 'Omeprazole 20mg', category: 'Digestive Health', description: 'Acid reflux treatment', inStock: true },
  { id: '7', name: 'Cetirizine 10mg', category: 'Allergy Relief', description: 'Antihistamine for allergies', inStock: true },
  { id: '8', name: 'Vitamin C 1000mg', category: 'Wellness', description: 'Immune system support', inStock: true },
];

const COMMON_SYMPTOMS = [
  { symptom: 'Headache', suggestedMedicines: ['Paracetamol 500mg', 'Ibuprofen 200mg'] },
  { symptom: 'Fever', suggestedMedicines: ['Paracetamol 500mg'] },
  { symptom: 'Cough', suggestedMedicines: ['Cough syrup'] },
  { symptom: 'Allergies', suggestedMedicines: ['Cetirizine 10mg'] },
  { symptom: 'Stomach pain', suggestedMedicines: ['Omeprazole 20mg'] },
];

export default function MedicineSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Medicine[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'medicine' | 'symptom'>('medicine');
  const [isLoading, setIsLoading] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    // Simulate search delay
    setTimeout(() => {
      if (selectedTab === 'medicine') {
        const filtered = MOCK_MEDICINES.filter(
          (med) =>
            med.name.toLowerCase().includes(query.toLowerCase()) ||
            med.category.toLowerCase().includes(query.toLowerCase()) ||
            med.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } else {
        const matchedSymptom = COMMON_SYMPTOMS.find(
          (s) => s.symptom.toLowerCase().includes(query.toLowerCase())
        );
        if (matchedSymptom) {
          const medicineResults = MOCK_MEDICINES.filter((med) =>
            matchedSymptom.suggestedMedicines.some((name) =>
              med.name.toLowerCase().includes(name.toLowerCase())
            )
          );
          setResults(medicineResults);
        } else {
          setResults([]);
        }
      }
      setIsLoading(false);
    }, 300);
  };

  const handleResultClick = (medicine: Medicine) => {
    setSearchQuery(medicine.name);
    setShowResults(false);
  };

  return (
    <div className="w-full">
      <div ref={searchBoxRef} className="relative">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={
              selectedTab === 'medicine'
                ? 'Search medicines by name (e.g., Paracetamol, Antibiotics)...'
                : 'Search by symptom (e.g., Headache, Fever)...'
            }
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-base"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Loader className="w-5 h-5 animate-spin text-primary-600" />
            </div>
          )}
        </div>

        {/* Search Tabs */}
        <div className="flex gap-2 mt-3 border-b border-neutral-200">
          <button
            onClick={() => {
              setSelectedTab('medicine');
              setSearchQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'medicine'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Pill className="w-4 h-4 inline mr-2" />
            Medicines
          </button>
          <button
            onClick={() => {
              setSelectedTab('symptom');
              setSearchQuery('');
              setResults([]);
              setShowResults(false);
            }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === 'symptom'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <AlertCircle className="w-4 h-4 inline mr-2" />
            Symptoms
          </button>
        </div>

        {/* Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <Loader className="w-6 h-6 animate-spin text-primary-600 mx-auto mb-2" />
                <p className="text-neutral-600 text-sm">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((medicine) => (
                  <button
                    key={medicine.id}
                    onClick={() => handleResultClick(medicine)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary-50 transition-colors text-left border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900 text-sm">{medicine.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {medicine.category} · {medicine.description}
                      </p>
                    </div>
                    <div className="ml-3 text-right">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        medicine.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : searchQuery.trim() ? (
              <div className="p-6 text-center">
                <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-600 text-sm">No results found for "{searchQuery}"</p>
                <p className="text-neutral-500 text-xs mt-2">
                  Try a different search or contact our pharmacists via WhatsApp
                </p>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-neutral-600 text-sm">Start typing to search medicines or symptoms</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Suggestions */}
        {!showResults && selectedTab === 'symptom' && !searchQuery && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-neutral-600 uppercase mb-2">Common Symptoms</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COMMON_SYMPTOMS.map((item) => (
                <button
                  key={item.symptom}
                  onClick={() => handleSearch(item.symptom)}
                  className="px-3 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
                >
                  {item.symptom}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
