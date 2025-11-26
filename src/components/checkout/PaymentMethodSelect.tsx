// src/components/checkout/PaymentMethodSelect.tsx
'use client';

import { CreditCard, Smartphone, Wallet, ArrowLeft, ArrowRight } from 'lucide-react';

interface PaymentMethodSelectProps {
  value: string;
  onChange: (method: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const PaymentMethodSelect = ({ value, onChange, onBack, onNext }: PaymentMethodSelectProps) => {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with your credit or debit card'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Fast UPI payment'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Pay with your digital wallet'
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: Wallet,
      description: 'Pay when you receive your order'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = value === method.id;
            
            return (
              <div
                key={method.id}
                onClick={() => onChange(method.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#5156D2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-[#5156D2]' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    isSelected ? 'border-[#5156D2] bg-[#5156D2]' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shipping
          </button>
          
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
          >
            Review Order
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};