// File: src/components/checkout/PaymentMethodSelect.tsx
// Purpose: Component for selecting payment method with responsive design and brand colors
'use client'

import { CreditCard, Smartphone, Wallet, Banknote, ArrowLeft, ArrowRight } from 'lucide-react'

interface PaymentMethodSelectProps {
  value: string
  onChange: (method: string) => void
  onBack: () => void
  onNext: () => void
}

export const PaymentMethodSelect = ({ value, onChange, onBack, onNext }: PaymentMethodSelectProps) => {
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-[#5156D2]' },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, color: 'text-[#5156D2]' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'text-[#5156D2]' },
    { id: 'cash', name: 'Cash on Delivery', icon: Banknote, color: 'text-[#5156D2]' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-3 mb-8">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-[#5156D2] ${
                value === method.id 
                  ? 'border-[#5156D2] bg-blue-50' 
                  : 'border-gray-200 hover:shadow-sm'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={value === method.id}
                onChange={(e) => onChange(e.target.value)}
                className="text-[#5156D2] focus:ring-[#5156D2]"
              />
              <IconComponent className={`w-5 h-5 ${method.color}`} />
              <span className="text-gray-900 font-medium flex-1">{method.name}</span>
            </label>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shipping
        </button>
        
        <button
          type="button"
          onClick={onNext}
          disabled={!value}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1 sm:order-2"
        >
          Review Order
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}