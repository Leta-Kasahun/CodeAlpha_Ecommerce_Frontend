'use client'

import { useState, useEffect, useCallback } from 'react'
import { ordersAPI } from '@/src/lib/api/orders'
import { Order } from '@/src/types'
import { useAuthStore } from '@/src/stores'

interface OrderFilters {
  status: string
  paymentStatus: string
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<OrderFilters>({
    status: '',
    paymentStatus: ''
  })
  
  const { token, isAuthenticated } = useAuthStore()

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await ordersAPI.getOrders(token)
      
      if (response.success) {
        setOrders(response.orders || [])
      } else {
        setError(response.message || 'Failed to fetch orders')
      }
    } catch (err: any) {
      setError(err.message || 'Network error while fetching orders')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: string) => {
    if (!isAuthenticated || !token) {
      throw new Error('Authentication required')
    }

    try {
      const response = await ordersAPI.updateOrderStatus(orderId, newStatus, token)
      
      if (response.success) {
        if (response.order) {
          setOrders(prev => prev.map(o => o._id === orderId ? response.order! : o))
        } else {
          setOrders(prev => prev.map(order => 
            order._id === orderId ? { 
              ...order, 
              orderStatus: newStatus as 'processing' | 'shipped' | 'completed' 
            } : order
          ))
        }
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update order status')
    }
  }, [isAuthenticated, token])

  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    loading,
    error,
    filters,
    updateOrderStatus,
    refetchOrders: fetchOrders,
    updateFilters
  }
}