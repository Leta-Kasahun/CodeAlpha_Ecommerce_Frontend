// Empty cart component with redirect to products
// Path: src/components/cart/CartEmpty.tsx

'use client'

import { useRouter } from 'next/navigation'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

export function CartEmpty() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            onClick={() => router.push('/products')} // Redirect to products page
            className="bg-[#5156D2] hover:bg-[#4549C7] text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  )
}