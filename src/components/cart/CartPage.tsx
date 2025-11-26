// Fixed cart page with stable useEffect dependencies
// Path: src/components/cart/CartPage.tsx

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/src/hooks/useCart'
import { CartItems } from './CartItems'
import { CartSummary } from './CartSummary'
import { CartEmpty } from './CartEmpty'
import { useAuthStore } from '@/src/stores'

export function CartPage() {
  const { cart, loading, error, loadCart } = useCart()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  // Simplified useEffect with stable dependencies
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🛒 User authenticated, loading cart...')
      loadCart()
    } else {
      console.log('🛒 User not authenticated, redirecting to login...')
      router.push('/login')
    }
  }, [isAuthenticated]) // Only depend on isAuthenticated

  // Show loading while checking authentication or loading cart
  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Cart</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadCart}
              className="bg-[#5156D2] text-white px-4 py-2 rounded-lg hover:bg-[#4549C7]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Check if cart has items
  const hasItems = cart && cart.items && cart.items.length > 0

  if (!hasItems) {
    return <CartEmpty />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}