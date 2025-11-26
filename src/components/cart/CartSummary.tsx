// src/components/cart/CartSummary.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/src/hooks/useCart';
import { Truck, Shield, ArrowRight } from 'lucide-react';

export function CartSummary() {
  const { cart } = useCart();
  const router = useRouter();

  // Null safety check
  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  const subtotal = cart.total;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    router.push('/dashboard/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-base font-semibold">
            <span className="text-gray-900">Total</span>
            <span className="text-[#5156D2]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors font-medium"
      >
        Proceed to Checkout
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Trust Badges */}
      <div className="space-y-3 pt-6 border-t border-gray-200 mt-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4 text-[#E6B84A]" />
          <span>Free shipping over $50</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-[#E6B84A]" />
          <span>Secure checkout</span>
        </div>
      </div>

      {subtotal < 50 && (
        <p className="text-sm text-center text-[#E6B84A] mt-4 font-medium">
          Add ${(50 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  );
}