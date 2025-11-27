// src/hooks/useCart.ts
'use client'

import { useState, useCallback } from 'react'
import { cartAPI } from '@/src/lib/api/cart'
import { useAuthStore } from '@/src/stores'

export function useCart() {
  const [cart, setCart] = useState<any>({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, isAuthenticated } = useAuthStore()

  const loadCart = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setCart({ items: [], total: 0 })
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await cartAPI.getCartSimple(token)
      setCart({
        items: response.items ?? [],
        total: typeof response.total === 'number' ? response.total : 0,
        raw: response.raw,
      })
    } catch {
      setError('Failed to load cart')
      setCart({ items: [], total: 0 })
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to add to cart')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await cartAPI.addToCart(productId, quantity, token)
      if (response.success) await loadCart()
      else setError(response.message || 'Failed to add to cart')
    } catch {
      setError('Failed to add item to cart')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    if (!isAuthenticated || !token) return
    setLoading(true)
    try {
      const response = await cartAPI.updateCartItem(productId, quantity, token)
      if (response.success) await loadCart()
      else setError(response.message || 'Failed to update cart')
    } catch {
      setError('Failed to update cart item')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const removeFromCart = useCallback(async (productId: string) => {
    if (!isAuthenticated || !token) return
    setLoading(true)
    try {
      const response = await cartAPI.removeFromCart(productId, token)
      if (response.success) await loadCart()
      else setError(response.message || 'Failed to remove from cart')
    } catch {
      setError('Failed to remove item from cart')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, loadCart])

  const clearCart = useCallback(async () => {
    if (!isAuthenticated || !token) return
    setLoading(true)
    try {
      const response = await cartAPI.clearCart(token)
      if (response.success) await loadCart()
      else setError(response.message || 'Failed to clear cart')
    } catch {
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