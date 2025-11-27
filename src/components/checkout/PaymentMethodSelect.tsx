// src/components/checkout/PaymentMethodSelect.tsx
'use client';

import { CreditCard, Smartphone, Wallet, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';

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
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
    },
    {
      id: 'upi',
      name: 'UPI (Unified Payments Interface)',
      description: 'Google Pay, PhonePe, Paytm',
      icon: Smartphone,
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Paytm Wallet, Google Wallet, Apple Pay',
      icon: Wallet,
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'Pay with cash when your order arrives',
      icon: DollarSign,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            const isSelected = value === method.id;
            return (
              <button
                type="button"
                key={method.id}
                onClick={() => onChange(method.id)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#5156D2] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#5156D2]' : 'bg-gray-100'}`}>
                  <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{method.name}</h3>
                    <div className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'border-[#5156D2] bg-[#5156D2]' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                </div>
              </button>
            );
          })}
        </div>

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
            type="button"
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
          >
            Review Order
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};