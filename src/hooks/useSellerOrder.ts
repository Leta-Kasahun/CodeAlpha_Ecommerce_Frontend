// File: src/hooks/useSellerOrder.ts
'use client'

import { useState, useCallback } from 'react'
import { sellerOrdersAPI } from '@/src/lib/api/sellerOrders'
import { SellerOrder } from '@/src/types/seller'
import { useAuthStore } from '@/src/stores'

export const useSellerOrder = () => {
  const [order, setOrder] = useState<SellerOrder | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { token, isAuthenticated } = useAuthStore()

  const fetchOrder = useCallback(async (orderId: string) => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Fetch all orders and find the specific one
      const response = await sellerOrdersAPI.getSellerOrders(token)
      
      if (response.success && response.orders) {
        const foundOrder = response.orders.find(order => order._id === orderId)
        if (foundOrder) {
          setOrder(foundOrder)
        } else {
          setError('Order not found in your orders list')
        }
      } else {
        setError(response.message || 'Failed to fetch orders')
      }
    } catch (err: any) {
      setError(err.message || 'Network error while fetching order details')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const clearOrder = useCallback(() => {
    setOrder(null)
    setError(null)
  }, [])

  return {
    order,
    loading,
    error,
    fetchOrder,
    clearOrder
  }
}