// File: src/app/dashboard/checkout/page.tsx
// Purpose: Checkout page without automatic cart redirect
'use client'

import { CheckoutForm } from '@/src/components/checkout/CheckoutForm'
import { useCart } from '@/src/hooks/useCart'
import { useAuthStore } from '@/src/stores'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading: cartLoading } = useCart()
  const { isAuthenticated } = useAuthStore()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/checkout')
    }
  }, [isAuthenticated, router])

  // REMOVE the cart redirect useEffect - let the CheckoutForm handle empty cart

  if (!isAuthenticated || cartLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#5156D2] animate-spin" />
        <span className="ml-2 text-gray-600">Loading checkout...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>
        
        <CheckoutForm />
      </div>
    </div>
  )
}