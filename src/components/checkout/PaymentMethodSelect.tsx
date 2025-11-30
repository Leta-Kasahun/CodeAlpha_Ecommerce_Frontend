// File: src/components/checkout/PaymentMethodSelect.tsx
'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

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
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
      ]
    },
    { 
      id: 'upi', 
      name: 'UPI Payment',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/7/7d/UPI-Logo-vector.svg'
      ]
    },
    { 
      id: 'wallet', 
      name: 'Digital Wallet',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
        'https://upload.wikimedia.org/wikipedia/commons/f/fa/Google_Pay.svg'
      ]
    },
    { 
      id: 'cash', 
      name: 'Cash on Delivery',
      logos: [
        'https://upload.wikimedia.org/wikipedia/commons/d/da/Indian_Rupee_symbol.svg'
      ]
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[500px] md:min-h-[550px] flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 bg-[#5156D2] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">$</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-[#5156D2] hover:shadow-sm ${
              value === method.id 
                ? 'border-[#5156D2] bg-blue-50' 
                : 'border-gray-200'
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
            
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                {method.logos.map((logo, index) => (
                  <div key={index} className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                    <img 
                      src={logo} 
                      alt={`${method.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
              
              <span className="text-gray-900 font-medium">{method.name}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-[#5156D2] rounded-full p-1 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">Secure Payment</h4>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure. We don't store your card details.
            </p>
          </div>
        </div>
      </div>

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