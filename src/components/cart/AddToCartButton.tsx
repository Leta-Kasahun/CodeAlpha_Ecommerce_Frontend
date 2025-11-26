// Reusable add to cart button for all product components
// Path: src/components/cart/AddToCartButton.tsx

'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Loader } from 'lucide-react'
import { useCart } from '@/src/hooks/useCart'
import { Button } from '@/src/components/ui/button'

interface AddToCartButtonProps {
  productId: string
  productName: string
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function AddToCartButton({
  productId,
  productName,
  disabled = false,
  className = "",
  size = 'md'
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const { addToCart, loading } = useCart()

  const handleAddToCart = async () => {
    if (disabled || loading) return
    
    try {
      await addToCart(productId, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      // Error handled by hook
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || loading}
      className={`${sizeClasses[size]} ${className} ${
        added 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-[#5156D2] hover:bg-[#4549C7] text-white'
      } transition-all duration-300 flex items-center space-x-2`}
    >
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : added ? (
        <Check className="h-4 w-4" />
      ) : (
        <ShoppingCart className="h-4 w-4" />
      )}
      <span>
        {loading ? 'Adding...' : added ? 'Added!' : 'Add to Cart'}
      </span>
    </Button>
  )
}