// src/components/checkout/ShippingAddressForm.tsx
'use client';

import { MapPin, ArrowRight } from 'lucide-react';
import { useState as reactUseState, Dispatch, SetStateAction } from 'react';

interface ShippingAddressFormProps {
  data: { city: string; postalCode: string; country: string };
  onChange: (data: any) => void;
  onNext: () => void;
}

export const ShippingAddressForm = ({ data, onChange, onNext }: ShippingAddressFormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!data.city.trim()) newErrors.city = 'City is required';
    if (!data.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!data.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) onNext();
  };

  const handleInputChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              id="city"
              value={data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your city"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
            <input
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter postal code"
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              id="country"
              value={data.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your country"
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="button" onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors">
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
function useState<T>(initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  return reactUseState<T>(initial as any);
}
