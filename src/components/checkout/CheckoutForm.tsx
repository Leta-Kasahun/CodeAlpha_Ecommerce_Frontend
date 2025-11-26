// src/components/checkout/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useCreateOrder } from '@/src/hooks/useCreateOrder';
import { ShippingAddressForm } from './ShippingAddressForm';
import { PaymentMethodSelect } from './PaymentMethodSelect';
import { OrderSummary } from './OrderSummary';

export const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shippingAddress: {
      city: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: 'card',
  });

  const { createOrder, loading, error } = useCreateOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder(formData);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-md">
          {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > index + 1 
                  ? 'bg-[#5156D2] text-white'
                  : step === index + 1
                  ? 'bg-[#E6B84A] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                step >= index + 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {stepName}
              </span>
              {index < 2 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  step > index + 1 ? 'bg-[#5156D2]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Steps */}
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

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </form>
  );
};