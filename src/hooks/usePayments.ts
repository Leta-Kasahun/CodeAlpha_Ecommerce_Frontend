'use client'

import { useState, useCallback } from 'react'
import { paymentsAPI } from '@/src/lib/api/payments'
import { useAuthStore } from '@/src/stores'

interface CreatePaymentData {
  order: string
  amount: number
  method: 'card' | 'upi' | 'wallet' | 'cash'
}

export const usePayments = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const createPayment = useCallback(async (data: CreatePaymentData) => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await paymentsAPI.createPayment(data, token)
      
      if (response.success && response.payment) {
        return response.payment
      } else {
        setError(response.message || 'Failed to create payment')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Network error creating payment')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const processPayment = useCallback(async (paymentId: string, status: 'success' | 'failed') => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const response = await paymentsAPI.processPayment(paymentId, { status }, token)
      
      if (response.success && response.payment) {
        return response.payment
      } else {
        setError(response.message || 'Failed to process payment')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Network error processing payment')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const clearError = useCallback(() => setError(null), [])

  return {
    createPayment,
    processPayment,
    loading,
    error,
    clearError
  }
}