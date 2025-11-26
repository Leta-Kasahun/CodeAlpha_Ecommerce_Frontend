// Reusable add to cart button with proper functionality
// Path: src/components/cart/AddToCartButton.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { useCart } from '@/src/hooks/useCart'
import { useAuthStore } from '@/src/stores'
import { Button } from '@/src/components/ui/button'

interface AddToCartButtonProps {
  productId: string
  productName: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  redirectToCart?: boolean
}

export function AddToCartButton({
  productId,
  productName,
  disabled = false,
  className = "",
  size = 'md',
  showText = true,
  redirectToCart = false
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const { addToCart, loading } = useCart()
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  const handleAddToCart = async () => {
    if (disabled || loading) return
    
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    
    try {
      await addToCart(productId, 1)
      setAdded(true)
      
      if (redirectToCart) {
        setTimeout(() => {
          router.push('/cart')
        }, 1000)
      } else {
        setTimeout(() => setAdded(false), 2000)
      }
    } catch (error) {
      console.error('Add to cart error:', error)
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm', 
    lg: 'px-4 py-3 text-base'
  }

  const buttonText = loading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || loading}
      className={`${sizeClasses[size]} ${className} ${
        added 
          ? 'bg-[#E6B84A] hover:bg-[#d4a63f] text-white' 
          : 'bg-[#5156D2] hover:bg-[#4549C7] text-white'
      } transition-all duration-300 flex items-center space-x-2`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : added ? (
        <Check className="h-4 w-4" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
      {showText && <span>{buttonText}</span>}
    </Button>
  )
}