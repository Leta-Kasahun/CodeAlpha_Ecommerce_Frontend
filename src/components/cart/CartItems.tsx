// Cart items component with robust data handling
// Path: src/components/cart/CartItems.tsx

'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/src/hooks/useCart'
import { Button } from '@/src/components/ui/button'

export function CartItems() {
  const { cart, updateCartItem, removeFromCart, loading } = useCart()

  console.log('🛒 Cart data in CartItems:', cart)
  console.log('🛒 Cart items in CartItems:', cart?.items)

  // Handle all possible cart data structures
  const getCartItems = () => {
    if (!cart) return []
    
    // Try different possible structures
    if (Array.isArray(cart.items)) return cart.items
    if (Array.isArray(cart.cart?.items)) return cart.cart.items
    if (Array.isArray(cart)) return cart
    
    return []
  }

  const cartItems = getCartItems()
  
  console.log('🛒 Processed cart items:', cartItems)

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">Your cart is empty</p>
        <p className="text-sm text-gray-500 mt-2">Add some products to get started!</p>
      </div>
    )
  }

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    await updateCartItem(productId, newQuantity)
  }

  const handleRemoveItem = async (productId: string) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      await removeFromCart(productId)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
      {cartItems.map((item: any, index: number) => {
        // Handle different item structures
        const product = item.product || item
        const quantity = item.qty || item.quantity || 1
        const productId = product._id || product.id || index

        console.log('🛒 Rendering cart item:', { product, quantity, productId })

        return (
          <div key={productId} className="p-6 flex items-start space-x-4">
            {/* Product Image */}
            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-xs">No Image</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {product.name || 'Unknown Product'}
              </h3>
              <p className="text-[#5156D2] font-bold text-lg mt-1">
                ${product.price || 0}
              </p>
              
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(productId, quantity - 1)}
                    disabled={quantity <= 1 || loading}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 text-gray-900 font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(productId, quantity + 1)}
                    disabled={loading}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(productId)}
                  disabled={loading}
                  className="p-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${((product.price || 0) * quantity).toFixed(2)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}