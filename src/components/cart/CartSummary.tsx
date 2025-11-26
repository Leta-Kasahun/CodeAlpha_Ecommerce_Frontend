// Cart summary component with flexible data handling
// Path: src/components/cart/CartSummary.tsx

'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/src/hooks/useCart'
import { Button } from '@/src/components/ui/button'

export function CartSummary() {
  const { cart } = useCart()
  const router = useRouter()

  console.log('🛒 Cart data in CartSummary:', cart)

  if (!cart) return null

  // Handle different cart data structures
  const cartItems = cart.items || cart.cart?.items || []
  
  const subtotal = cartItems.reduce((total: number, item: any) => {
    const product = item.product || item
    const quantity = item.qty || item.quantity || 1
    return total + (product.price * quantity)
  }, 0)

  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
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
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        className="w-full mt-6 bg-[#5156D2] hover:bg-[#4549C7] text-white py-3 text-lg"
      >
        Proceed to Checkout
      </Button>

      {subtotal < 50 && (
        <p className="text-sm text-center text-gray-600 mt-3">
          Add ${(50 - subtotal).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  )
}