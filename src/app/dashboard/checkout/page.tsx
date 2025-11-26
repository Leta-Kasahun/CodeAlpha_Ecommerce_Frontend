// src/app/dashboard/checkout/page.tsx
import { CheckoutForm } from '@/src/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order</p>
      </div>
      <CheckoutForm />
    </div>
  );
}