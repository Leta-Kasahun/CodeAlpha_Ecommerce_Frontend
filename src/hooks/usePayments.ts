// usePayments: hook to create and process payments. Accepts optional callbacks (onSuccess) e.g., to refresh cart after payment success.
'use client'

import { useState, useCallback } from 'react'
import { paymentsAPI } from '@/src/lib/api/payments'
import { useAuthStore } from '@/src/stores'

interface CreatePaymentData {
  order: string
  amount: number
  method: 'card' | 'upi' | 'wallet' | 'cash'
}

interface ProcessPaymentData {
  status: 'success' | 'failed'
}

export const usePayments = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const createPayment = useCallback(async (data: CreatePaymentData) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to create a payment')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const res = await paymentsAPI.createPayment(data, token)
      if (res.success && res.payment) {
        return res.payment
      } else {
        setError(res.message || 'Failed to initiate payment')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Network error while creating payment')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const processPayment = useCallback(async (paymentId: string, data: ProcessPaymentData, onSuccess?: () => Promise<void> | void) => {
    if (!isAuthenticated || !token) {
      setError('Please log in to process payment')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const res = await paymentsAPI.processPayment(paymentId, data, token)
      if (res.success && res.payment) {
        if (data.status === 'success' && typeof onSuccess === 'function') {
          try {
            await onSuccess()
          } catch (e) {
            // swallow onSuccess errors here; caller can handle
          }
        }
        return res.payment
      } else {
        setError(res.message || 'Failed to process payment')
        return null
      }
    } catch (err: any) {
      setError(err.message || 'Network error while processing payment')
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