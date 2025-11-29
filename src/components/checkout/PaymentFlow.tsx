// File: src/components/checkout/PaymentFlow.tsx
// PaymentFlow: handles complete payment process after order creation with cart amount calculation
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePayments } from '@/src/hooks/usePayments'
import { useCart } from '@/src/hooks/useCart'
import { CreditCard, Shield, CheckCircle, Loader2 } from 'lucide-react'

interface PaymentFlowProps {
  orderId: string
  onPaymentComplete: (result: any) => void
  className?: string
}

export const PaymentFlow = ({ orderId, onPaymentComplete, className = '' }: PaymentFlowProps) => {
  const router = useRouter()
  const { createPayment, processPayment, loading, error, clearError } = usePayments()
  const { cart, loadCart } = useCart()

  const calculatePaymentAmount = () => {
    if (!cart?.items?.length) return 0
    
    const subtotal = cart.items.reduce((sum: number, item: any) => {
      const price = typeof item.product === 'object' && item.product !== null 
        ? Number(item.product?.price ?? 0) 
        : Number(item.product ?? 0)
      return sum + price * Number(item.qty || 0)
    }, 0)
    
    const shipping = subtotal > 50 ? 0 : cart.items.length ? 9.99 : 0
    const tax = subtotal * 0.08
    return subtotal + shipping + tax
  }

  const paymentAmount = calculatePaymentAmount()

  const handlePayment = async () => {
    if (!orderId || paymentAmount <= 0) return

    clearError()
    try {
      const payment = await createPayment({
        order: orderId,
        amount: paymentAmount,
        method: 'card'
      })

      if (!payment?._id) return

      const processed = await processPayment(payment._id, { status: 'success' }, async () => {
        try {
          await loadCart()
        } catch (e) {
          console.warn('Cart refresh failed')
        }
      })

      if (processed?.status === 'success') {
        onPaymentComplete({ success: true, orderId })
      }
    } catch (err) {
      console.error('Payment error:', err)
    }
  }

  if (!orderId) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="text-red-500 mb-4">
          <CreditCard className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Invalid Order</h3>
        <p className="text-gray-600">Cannot process payment for invalid order.</p>
      </div>
    )
  }

  if (paymentAmount <= 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <div className="text-yellow-500 mb-4">
          <CreditCard className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Cart Empty</h3>
        <p className="text-gray-600">Cannot process payment with empty cart.</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-[#5156D2]" />
        <h3 className="text-lg font-semibold text-gray-900">Complete Payment</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Order Total</span>
            <span className="text-2xl font-bold text-[#5156D2]">${paymentAmount.toFixed(2)}</span>
          </div>
          <p className="text-sm text-blue-600">Order: {orderId.slice(-8)}</p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Secure Payment</p>
            <p className="text-xs text-gray-600">Your payment information is protected</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Pay ${paymentAmount.toFixed(2)}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}