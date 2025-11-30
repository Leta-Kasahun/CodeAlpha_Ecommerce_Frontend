'use client'

import { useState, useEffect, useCallback } from 'react'
import { ordersAPI } from '@/src/lib/api/orders'
import { Order } from '@/src/types'
import { useAuthStore } from '@/src/stores'

export const useOrder = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(Boolean(orderId))
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const fetchOrder = useCallback(async () => {
    if (!orderId || !isAuthenticated || !token) return

    setLoading(true)
    setError(null)
    
    try {
      const response = await ordersAPI.getOrder(orderId, token)
      
      if (response.success && response.order) {
        setOrder(response.order)
      } else {
        setError(response.message || 'Order not found')
        setOrder(null)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load order')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }, [orderId, isAuthenticated, token])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const refetchOrder = useCallback(() => {
    fetchOrder()
  }, [fetchOrder])

  const updateOrderStatus = useCallback(async (newStatus: string) => {
    if (!orderId || !isAuthenticated || !token) {
      throw new Error('Authentication required')
    }

    try {
      const response = await ordersAPI.updateOrderStatus(orderId, newStatus, token)
      
      if (response.success && response.order) {
        setOrder(response.order)
        return true
      } else {
        setOrder(prev => prev ? { 
          ...prev, 
          orderStatus: newStatus as 'processing' | 'shipped' | 'completed' 
        } : prev)
        return true
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update order status')
    }
  }, [orderId, isAuthenticated, token])

  return {
    order,
    loading,
    error,
    updateOrderStatus,
    refetchOrder
  }
}