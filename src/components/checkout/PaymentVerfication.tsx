// File: src/components/checkout/PaymentVerification.tsx
'use client'

import { useState } from 'react'
import { CreditCard, ArrowLeft } from 'lucide-react'

interface PaymentVerificationProps {
  order: any
  onPaymentComplete: (amount: number) => Promise<boolean>
  loading: boolean
  error?: string
}

export const PaymentVerification = ({ order, onPaymentComplete, loading, error }: PaymentVerificationProps) => {
  const [enteredAmount, setEnteredAmount] = useState('')

  const handlePayment = async () => {
    const amount = parseFloat(enteredAmount)
    if (isNaN(amount)) {
      alert('Please enter a valid amount')
      return
    }

    await onPaymentComplete(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[500px] md:min-h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-[#5156D2]" />
        <h2 className="text-lg font-semibold text-gray-900">Payment Verification</h2>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#5156D2] rounded-full p-2">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">Complete Your Payment</h3>
              <p className="text-sm text-blue-700 mt-1">Enter the exact amount to proceed with payment</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Order Total</p>
          <p className="text-3xl font-bold text-[#5156D2]">${order.totalPrice}</p>
          <p className="text-xs text-gray-500 mt-2">Please enter this exact amount below</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Payment Amount
            </label>
            <input
              id="paymentAmount"
              type="number"
              value={enteredAmount}
              onChange={(e) => setEnteredAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-lg text-center"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-700">Amount must match exactly: <span className="font-semibold">${order.totalPrice}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading || !enteredAmount}
          className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1 sm:order-2"
        >
          {loading ? 'Processing Payment...' : `Pay $${enteredAmount || '0.00'}`}
        </button>
      </div>
    </div>
  )
}