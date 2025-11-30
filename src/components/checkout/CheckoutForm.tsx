// CheckoutForm: Fixed layout with equal heights, proper spacing, and correct step positioning
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { usePayments } from '@/src/hooks/usePayments'
import { useCart } from '@/src/hooks/useCart'
import { ShippingAddressForm } from './ShippingAddressForm'
import { PaymentMethodSelect } from './PaymentMethodSelect'
import { OrderSummary } from './OrderSummary'
import { PaymentVerification } from './PaymentVerfication'
import { useAuthStore } from '@/src/stores'

export const CheckoutForm = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    shippingAddress: { city: '', postalCode: '', country: '' },
    paymentMethod: 'card' as 'card' | 'upi' | 'wallet' | 'cash',
  })
  const [createdOrder, setCreatedOrder] = useState<any>(null)
  const [paymentError, setPaymentError] = useState<string>('')

  const { createOrder, loading: creatingOrder, error: orderError } = useCreateOrder()
  const { createPayment, processPayment, loading: processingPayment, error: paymentErrorFromHook } = usePayments()
  const { loadCart } = useCart()

  const [submitting, setSubmitting] = useState(false)
  const error = orderError || paymentError || paymentErrorFromHook

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateOrder = async () => {
    if (!isAuthenticated) return null

    setSubmitting(true)
    setPaymentError('')
    try {
      const order = await createOrder({
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod
      })
      
      if (order && order._id) {
        setCreatedOrder(order)
        setTimeout(() => setStep(4), 0)
        return order
      } else {
        setPaymentError('Failed to create order - please try again')
        return null
      }
    } catch (err: any) {
      console.error('Order creation error:', err)
      setPaymentError('Failed to create order: ' + (err.message || 'Unknown error'))
      return null
    } finally {
      setSubmitting(false)
    }
  }

  const handlePaymentVerification = async (enteredAmount: number) => {
    if (!createdOrder || !createdOrder._id) {
      setPaymentError('Order not found. Please try creating the order again.')
      return false
    }

    if (enteredAmount !== createdOrder.totalPrice) {
      setPaymentError(`Amount must be exactly $${createdOrder.totalPrice}`)
      return false
    }

    setSubmitting(true)
    setPaymentError('')
    
    try {
      const paymentMethod = formData.paymentMethod || 'card'
      
      const payment = await createPayment({
        order: createdOrder._id,
        amount: enteredAmount,
        method: paymentMethod
      })

      if (!payment) {
        setPaymentError('Failed to create payment record')
        return false
      }
      
      const processed = await processPayment(payment._id, 'success')

      if (!processed) {
        setPaymentError('Payment processing failed. Please try again.')
        return false
      }

      try {
        await loadCart()
      } catch (cartError) {
        console.warn('Cart clear warning:', cartError)
      }

      router.push('/dashboard/orders')
      return true
      
    } catch (err: any) {
      console.error('Payment error:', err)
      setPaymentError(err.message || 'Payment failed. Please try again.')
      return false
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps - Fixed at top */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {['Shipping', 'Payment', 'Review', 'Pay'].map((stepName, index) => (
              <div key={stepName} className="flex items-center flex-1 justify-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                  step > index + 1 ? 'bg-[#5156D2] border-[#5156D2] text-white' : 
                  step === index + 1 ? 'border-[#E6B84A] bg-[#E6B84A] text-white' : 
                  'border-gray-300 bg-white text-gray-400'
                }`}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepName}
                </span>
                {index < 3 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-6 ${
                    step > index + 1 ? 'bg-[#5156D2]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[600px]">
              {step === 1 && (
                <ShippingAddressForm
                  data={formData.shippingAddress}
                  onChange={(data) => updateFormData('shippingAddress', data)}
                  onNext={() => setStep(2)}
                />
              )}

              {step === 2 && (
                <PaymentMethodSelect
                  value={formData.paymentMethod}
                  onChange={(method) => updateFormData('paymentMethod', method)}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              )}

              {step === 3 && (
                <div className="h-full flex flex-col">
                  <div className="space-y-6 flex-1">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                        <p className="text-sm text-gray-600">
                          {formData.shippingAddress.city}, {formData.shippingAddress.postalCode}, {formData.shippingAddress.country}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                        <p className="text-sm text-gray-600 capitalize">{formData.paymentMethod}</p>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCreateOrder}
                      disabled={isLoading}
                      className="flex-1 px-8 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                      {isLoading ? 'Creating Order...' : 'Create Order & Proceed to Payment'}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && createdOrder && (
                <PaymentVerification
                  order={createdOrder}
                  onPaymentComplete={handlePaymentVerification}
                  loading={isLoading}
                  error={paymentError}
                />
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[600px]">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}