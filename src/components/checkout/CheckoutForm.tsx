'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { usePayments } from '@/src/hooks/usePayments'
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
    paymentMethod: 'card' as 'card' | 'upi' | 'wallet' | 'cash',
  })

  const { createOrder, loading: creatingOrder, error: orderError } = useCreateOrder()
  const { createPayment, processPayment, loading: processingPayment, error: paymentError } = usePayments()
  const { loadCart } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const error = orderError || paymentError

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      return
    }

    setSubmitting(true)
    try {
      console.log('Step 1: Creating order with data:', formData)
      
      // 1) Create order (backend will NOT clear cart at this point)
      const order = await createOrder({
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod
      })
      
      console.log('Order creation response:', order)
      
      // FIX: Check if order is null/undefined before accessing _id
      if (!order) {
        throw new Error(orderError || 'Could not create order - no order returned')
      }

      // FIX: Check if order has _id property
      if (!order._id) {
        console.error('Order created but missing _id:', order)
        throw new Error('Order created but missing order ID')
      }

      console.log('Step 2: Creating payment for order:', order._id)
      
      // 2) Create payment record for the order (status: pending)
      const payment = await createPayment({
        order: order._id,
        amount: order.totalPrice, // Use order total from backend
        method: formData.paymentMethod
      })

      console.log('Payment creation response:', payment)

      if (!payment || !payment._id) {
        throw new Error('Could not initiate payment')
      }

      console.log('Step 3: Processing payment')
      
      // 3) Process payment - backend will clear cart ONLY on success
      const processed = await processPayment(payment._id, { status: 'success' }, async () => {
        // onSuccess callback: refresh client cart state after successful payment
        console.log('Payment successful, refreshing cart...')
        try {
          await loadCart()
        } catch (e) {
          console.warn('Cart refresh failed:', e)
        }
      })

      console.log('Payment processing response:', processed)

      if (!processed || processed.status !== 'success') {
        throw new Error('Payment failed. Your cart was not cleared.')
      }

      console.log('Step 4: Navigation to order details')
      
      // 4) Navigate to order details / confirmation
      router.push(`/dashboard/orders/${order._id}`)
      
    } catch (err: any) {
      console.error('Checkout error:', err)
      // Error is already set by the hooks
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 text-center w-full max-w-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Sign in to checkout</h2>
          <p className="text-sm text-gray-600 mb-6">Please sign in to complete your order.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
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

  const isLoading = creatingOrder || processingPayment || submitting

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content - Responsive */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps - Mobile Responsive */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
                  <div key={stepName} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step > index + 1 ? 'bg-[#5156D2] text-white' : 
                      step === index + 1 ? 'bg-[#E6B84A] text-white' : 
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {step > index + 1 ? '✓' : index + 1}
                    </div>
                    <span className={`hidden sm:block ml-2 text-sm ${
                      step >= index + 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {stepName}
                    </span>
                    {index < 2 && (
                      <div className={`hidden sm:block w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 ${
                        step > index + 1 ? 'bg-[#5156D2]' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content - Increased height with min-height */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[500px] md:min-h-[600px] flex flex-col">
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <ShippingAddressForm
                  data={formData.shippingAddress}
                  onChange={(data) => updateFormData('shippingAddress', data)}
                  onNext={() => {
                    // Validate required fields before proceeding
                    if (formData.shippingAddress.city && 
                        formData.shippingAddress.postalCode && 
                        formData.shippingAddress.country) {
                      setStep(2)
                    }
                  }}
                />
              )}

              {/* Step 2: Payment Method - Increased height */}
              {step === 2 && (
                <div className="flex-1 flex flex-col">
                  <PaymentMethodSelect
                    value={formData.paymentMethod}
                    onChange={(method) => updateFormData('paymentMethod', method)}
                    onBack={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                </div>
              )}

              {/* Step 3: Review and Submit */}
              {step === 3 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
                      disabled={isLoading}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                      {isLoading ? 'Processing...' : 'Place Order & Pay'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar - Responsive with equal height */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 h-full">
              <div className="h-full flex flex-col">
                <OrderSummary />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}