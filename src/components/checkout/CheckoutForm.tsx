// CheckoutForm: handles multi-step checkout, creates order, initiates payment, processes payment,
// and refreshes cart AFTER payment success. Comments only at top per project rules.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { usePayments } from '@/src/hooks/usePaymets'
import { useCart } from '@/src/hooks/useCart'
import { ShippingAddressForm } from './ShippingAddressForm'
import { PaymentMethodSelect } from './PaymentMethodSelect'
import { OrderSummary } from './OrderSummary'
import { useAuthStore } from '@/src/stores'

export const CheckoutForm = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    shippingAddress: { city: '', postalCode: '', country: '' },
    paymentMethod: 'card',
  })

  const { createOrder } = useCreateOrder()
  const { createPayment, processPayment } = usePayments()
  const { loadCart } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isAuthenticated) {
      setError('Please sign in to complete checkout.')
      return
    }

    // Final step: create order -> create payment -> process payment -> refresh cart -> navigate to order
    setSubmitting(true)
    try {
      // 1) Create order (backend will NOT clear cart)
      const order = await createOrder(formData)
      if (!order || !order._id) {
        setError('Could not create order. Please try again.')
        setSubmitting(false)
        return
      }

      // 2) Create payment record for the order (status: pending)
      const payment = await createPayment({
        order: order._id,
        amount: order.totalPrice ?? 0,
        method: formData.paymentMethod as 'card' | 'upi' | 'wallet' | 'cash'
      })

      if (!payment || !payment._id) {
        setError('Could not initiate payment. Please try again.')
        setSubmitting(false)
        return
      }

      // 3) Process payment (simulate or perform actual flow).
      // The backend will update order.paymentStatus and clear cart only on success.
      const processed = await processPayment(payment._id, { status: 'success' }, async () => {
        // onSuccess callback: refresh client cart state so UI immediately reflects cleared cart
        try {
          await loadCart()
        } catch (e) {
          // ignore loadCart errors here; UI will sync on next fetch
        }
      })

      if (!processed || processed.status !== 'success') {
        setError('Payment failed. Your cart was not cleared. Please retry payment.')
        setSubmitting(false)
        return
      }

      // 4) Navigate to order details / confirmation
      router.push(`/dashboard/orders/${order._id}`)
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during checkout.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Sign in to checkout</h2>
          <p className="text-sm text-gray-600 mb-6">Please sign in to complete your order.</p>
          <div className="flex justify-center gap-3">
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => router.push('/register')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" noValidate>
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-md">
          {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > index + 1 ? 'bg-[#5156D2] text-white' : step === index + 1 ? 'bg-[#E6B84A] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm ${step >= index + 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {stepName}
              </span>
              {index < 2 && <div className={`w-12 h-0.5 mx-4 ${step > index + 1 ? 'bg-[#5156D2]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <ShippingAddressForm
            data={formData.shippingAddress}
            onChange={(data) => updateFormData('shippingAddress', data)}
            onNext={() => setStep(2)}
          />
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <PaymentMethodSelect
            value={formData.paymentMethod}
            onChange={(method) => updateFormData('paymentMethod', method)}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {/* Step 3: Review and Submit */}
        {step === 3 && (
          <div className="space-y-4 h-full flex flex-col">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Ready to complete your order</h3>
                  <p className="text-sm text-green-700 mt-1">Review your information before placing the order</p>
                </div>
              </div>
            </div>

            {/* Review Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
              <p className="text-sm text-gray-600">
                {formData.shippingAddress.city}, {formData.shippingAddress.postalCode}, {formData.shippingAddress.country}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
              <p className="text-sm text-gray-600 capitalize">{formData.paymentMethod}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="flex gap-3 mt-auto">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={submitting}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="h-full flex flex-col">
          <OrderSummary />
        </div>
      </div>
    </form>
  )
}