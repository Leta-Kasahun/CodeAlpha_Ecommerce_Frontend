// src/components/cart/CartItems.tsx
'use client';

import { Minus, Plus, Trash2, Package } from 'lucide-react';

type Props = {
  cart: any;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  loading: boolean;
};

export function CartItems({ cart, updateCartItem, removeFromCart, loading }: Props) {
  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No items in cart</p>
      </div>
    );
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = async (productId: string) => {
    if (confirm('Remove this item from your cart?')) {
      await removeFromCart(productId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {cart.items.map((item: any) => {
          const rawProduct = item.product;
          const product = typeof rawProduct === 'string'
            ? { _id: rawProduct, name: 'Product removed', price: 0, images: [] }
            : (rawProduct ?? { _id: item._id ?? '', name: 'Product removed', price: 0, images: [] });

          const quantity = Number(item.qty || 0);
          const productId = product._id || item._id || '';

          return (
            <div key={item._id ?? productId} className="p-4 sm:p-6 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Package className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate text-sm sm:text-base">
                  {product.name}
                </h3>
                <p className="text-[#5156D2] font-semibold text-sm sm:text-base">
                  ${product.price}
                </p>
                
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(productId, quantity - 1)}
                      disabled={quantity <= 1 || loading}
                      className="p-1 sm:p-2 text-gray-600 hover:text-[#5156D2] disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <span className="px-2 sm:px-3 py-1 text-gray-900 font-medium text-sm sm:text-base min-w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(productId, quantity + 1)}
                      disabled={loading}
                      className="p-1 sm:p-2 text-gray-600 hover:text-[#5156D2] disabled:opacity-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(productId)}
                    disabled={loading}
                    className="p-1 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  ${(Number(product.price || 0) * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}