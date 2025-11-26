// Reusable cart hook for all components
// Path: src/hooks/useCart.ts

'use client'

import { useState, useCallback } from 'react'
import { cartAPI } from '@/src/lib/api/cart'
import { useAuthStore } from '@/src/stores'

interface UseCartReturn {
  cart: any
  loading: boolean
  error: string
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateCartItem: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  loadCart: () => Promise<void>
  clearError: () => void
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, user } = useAuthStore()

  const loadCart = useCallback(async () => {
    if (!token || !user) return
    
    try {
      setLoading(true)
      const response = await cartAPI.getCart()
      setCart(response.cart)
    } catch (err) {
      setError('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }, [token, user])

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    if (!token) {
      setError('Please log in to add to cart')
      return
    }

    try {
      setLoading(true)
      const response = await cartAPI.addToCart(productId, quantity)
      setCart(response.cart)
    } catch (err) {
      setError('Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }, [token])

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    if (!token) return

    try {
      setLoading(true)
      const response = await cartAPI.updateCartItem(productId, quantity)
      setCart(response.cart)
    } catch (err) {
      setError('Failed to update cart')
    } finally {
      setLoading(false)
    }
  }, [token])

  const removeFromCart = useCallback(async (productId: string) => {
    if (!token) return

    try {
      setLoading(true)
      const response = await cartAPI.removeFromCart(productId)
      setCart(response.cart)
    } catch (err) {
      setError('Failed to remove from cart')
    } finally {
      setLoading(false)
    }
  }, [token])

  const clearCart = useCallback(async () => {
    if (!token) return

    try {
      setLoading(true)
      const response = await cartAPI.clearCart()
      setCart(response.cart)
    } catch (err) {
      setError('Failed to clear cart')
    } finally {
      setLoading(false)
    }
  }, [token])

  const clearError = () => setError('')

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