'use client'

import { useState, useCallback } from 'react'
import { ordersAPI } from '@/src/lib/api/orders'
import { useAuthStore } from '@/src/stores'

interface CreateOrderData {
  shippingAddress: {
    city: string
    postalCode: string  
    country: string
  }
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cash'
}

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const createOrder = useCallback(async (data: CreateOrderData) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to place an order')
      return null
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await ordersAPI.createOrder(data, token)
      
      if (response.success && response.order) {
        return response.order
      } else {
        setError(response.message || 'Failed to create order')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Network error while creating order')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const clearError = useCallback(() => setError(null), [])

  return {
    createOrder,
    loading,
    error,
    clearError
  }
}