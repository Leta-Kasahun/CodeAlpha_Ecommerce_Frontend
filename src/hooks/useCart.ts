// Fixed cart hook with stable dependencies
// Path: src/hooks/useCart.ts

'use client'

import { useState, useCallback } from 'react'
import { cartAPI } from '@/src/lib/api/cart'
import { useAuthStore } from '@/src/stores'

export function useCart() {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, isAuthenticated } = useAuthStore()

  // Stable loadCart function
  const loadCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      console.log('🛒 Not authenticated, cannot load cart')
      setCart(null)
      return
    }
    
    try {
      setLoading(true)
      setError('')
      console.log('🛒 Loading cart with token...')
      const response = await cartAPI.getCart(token)
      console.log('🛒 Cart API response:', response)
      
      if (response.success) {
        setCart(response.cart)
        console.log('🛒 Cart loaded successfully:', response.cart)
      } else {
        setError(response.message || 'Failed to load cart')
        setCart(null)
      }
    } catch (err) {
      console.error('🛒 Cart load error:', err)
      setError('Failed to load cart from server')
      setCart(null)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token]) // Stable dependencies

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to add to cart')
      return
    }

    try {
      setLoading(true)
      setError('')
      console.log('🛒 Adding to cart:', { productId, quantity })
      
      const response = await cartAPI.addToCart(productId, quantity, token)
      console.log('🛒 Add to cart response:', response)
      
      if (response.success) {
        await loadCart()
      } else {
        setError(response.message || 'Failed to add to cart')
      }
    } catch (err) {
      console.error('🛒 Add to cart error:', err)
      setError('Failed to add item to cart')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    if (!isAuthenticated || !token) return

    try {
      setLoading(true)
      const response = await cartAPI.updateCartItem(productId, quantity, token)
      if (response.success) {
        await loadCart()
      } else {
        setError(response.message || 'Failed to update cart')
      }
    } catch (err) {
      console.error('🛒 Update cart error:', err)
      setError('Failed to update cart item')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const removeFromCart = useCallback(async (productId: string) => {
    if (!isAuthenticated || !token) return

    try {
      setLoading(true)
      const response = await cartAPI.removeFromCart(productId, token)
      if (response.success) {
        await loadCart()
      } else {
        setError(response.message || 'Failed to remove from cart')
      }
    } catch (err) {
      console.error('🛒 Remove from cart error:', err)
      setError('Failed to remove item from cart')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const clearCart = useCallback(async () => {
    if (!isAuthenticated || !token) return

    try {
      setLoading(true)
      const response = await cartAPI.clearCart(token)
      if (response.success) {
        await loadCart()
      } else {
        setError(response.message || 'Failed to clear cart')
      }
    } catch (err) {
      console.error('🛒 Clear cart error:', err)
      setError('Failed to clear cart')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const clearError = useCallback(() => setError(''), [])

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    clearError
  }
}