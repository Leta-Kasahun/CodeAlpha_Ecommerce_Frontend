// OrderSummary: use the zustand cart store's items/total (not a non-existent `cart` property).
'use client';

import { Package, Truck, Shield } from 'lucide-react';
import { useCartStore } from '@/src/stores';

export const OrderSummary = () => {
  const items = useCartStore((s: any) => Array.isArray(s.items) ? s.items : []);
  const subtotal = items.reduce((sum: number, it: any) => {
    const price = typeof it.product === 'object' ? Number(it.product.price ?? 0) : Number(it.product ?? 0);
    return sum + price * Number(it.qty || 0);
  }, 0);
  const shipping = subtotal > 50 ? 0 : items.length ? 9.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6 overflow-auto">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Package className="w-6 h-6 mx-auto mb-2 text-gray-400" />
            <div className="text-sm">Your cart is empty</div>
          </div>
        ) : (
          items.map((item: any, idx: number) => {
            const p = typeof item.product === 'object' ? item.product : { name: 'Product', price: 0, images: [] };
            return (
              <div key={idx} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {p.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{p.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="font-medium text-[#5156D2]">${Number(p.price || 0).toFixed(2)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="space-y-2 text-sm mb-6 mt-auto">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
          <span className="text-gray-900">Total</span>
          <span className="text-[#5156D2]">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4 text-[#E6B84A]" />
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-[#E6B84A]" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Package className="w-4 h-4 text-[#E6B84A]" />
          <span>30-day return policy</span>
        </div>
      </div>
    </div>
  );
};