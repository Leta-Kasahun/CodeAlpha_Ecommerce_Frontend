// File: src/components/checkout/PaymentMethodSelect.tsx
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
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: CreditCard, 
      color: 'text-[#5156D2]',
      description: 'Pay securely with your credit or debit card'
    },
    { 
      id: 'upi', 
      name: 'UPI Payment', 
      icon: Smartphone, 
      color: 'text-[#5156D2]',
      description: 'Fast payment using UPI apps'
    },
    { 
      id: 'wallet', 
      name: 'Digital Wallet', 
      icon: Wallet, 
      color: 'text-[#5156D2]',
      description: 'Pay with your digital wallet'
    },
    { 
      id: 'cash', 
      name: 'Cash on Delivery', 
      icon: Banknote, 
      color: 'text-[#5156D2]',
      description: 'Pay when you receive your order'
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[500px] md:min-h-[550px] flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <label
              key={method.id}
              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-[#5156D2] hover:shadow-sm ${
                value === method.id 
                  ? 'border-[#5156D2] bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={value === method.id}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-[#5156D2] focus:ring-[#5156D2] mt-1"
                  />
                  <IconComponent className={`w-6 h-6 ${method.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-gray-900 font-medium block">{method.name}</span>
                  <span className="text-sm text-gray-600 mt-1 block">{method.description}</span>
                </div>
              </div>
            </label>
          )
        })}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-[#5156D2] rounded-full p-1 mt-0.5">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Secure Payment</h4>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure. We don't store your card details.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4 border-t border-gray-200 mt-auto">
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