// File: src/components/checkout/CheckoutFlow.tsx
// CheckoutFlow: manages complete checkout process from shipping to payment with cart-based amount calculation
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateOrder } from '@/src/hooks/useCreateOrder'
import { ShippingAddressForm } from './ShippingAddressForm'
import { PaymentMethodSelect } from './PaymentMethodSelect'
import { OrderSummary } from './OrderSummary'
import { PaymentFlow } from './PaymentFlow'
import { useAuthStore } from '@/src/stores'

export const CheckoutFlow = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [step, setStep] = useState(1)
  const [createdOrder, setCreatedOrder] = useState<any>(null)
  const [formData, setFormData] = useState({
    shippingAddress: { city: '', postalCode: '', country: '' },
    paymentMethod: 'card' as 'card' | 'upi' | 'wallet' | 'cash',
  })

  const { createOrder, loading: creatingOrder, error: orderError } = useCreateOrder()

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) return

    try {
      const order = await createOrder({
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod
      })
      
      if (!order) throw new Error(orderError || 'Could not create order')
      if (!order._id) throw new Error('Order created but missing order ID')

      setCreatedOrder(order)
      setStep(4)
    } catch (err) {
      console.error('Order creation error:', err)
    }
  }

  const handlePaymentComplete = (result: any) => {
    if (result.success) {
      router.push(`/dashboard/orders/${result.orderId}`)
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

  const isLoading = creatingOrder

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {['Shipping', 'Payment', 'Review', 'Pay'].map((stepName, index) => (
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
                    {index < 3 && (
                      <div className={`hidden sm:block w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 ${
                        step > index + 1 ? 'bg-[#5156D2]' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 min-h-[500px] md:min-h-[600px] flex flex-col">
              {step === 1 && (
                <ShippingAddressForm
                  data={formData.shippingAddress}
                  onChange={(data) => updateFormData('shippingAddress', data)}
                  onNext={() => setStep(2)}
                />
              )}

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
                          <h3 className="text-sm font-medium text-green-800">Review your order</h3>
                          <p className="text-sm text-green-700 mt-1">Confirm your information before payment</p>
                        </div>
                      </div>
                    </div>

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

                    {orderError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">{orderError}</p>
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
                      onClick={handleCreateOrder}
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                      {isLoading ? 'Creating Order...' : 'Proceed to Payment'}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && createdOrder && (
                <div className="flex-1 flex flex-col">
                  <PaymentFlow
                    orderId={createdOrder._id}
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 h-full">
              <div className="h-full flex flex-col">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}