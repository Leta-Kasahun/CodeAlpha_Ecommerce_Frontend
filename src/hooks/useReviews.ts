// File: src/hooks/useReviews.ts
'use client'

import { useState, useCallback } from 'react'
import { reviewsAPI } from '@/src/lib/api/reviews'
import { useAuthStore } from '@/src/stores'

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const fetchReviews = useCallback(async () => {
    if (!productId) return
    setLoading(true)
    try {
      const response = await reviewsAPI.getProductReviews(productId)
      setReviews(response.reviews || response || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [productId])

  const createReview = useCallback(async (data: any) => {
    if (!isAuthenticated || !token || !productId) return false
    setLoading(true)
    try {
      await reviewsAPI.createReview({ product: productId, ...data }, token)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, productId])

  const updateReview = useCallback(async (reviewId: string, data: any) => {
    if (!isAuthenticated || !token) return false
    setLoading(true)
    try {
      await reviewsAPI.updateReview(reviewId, data, token)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  const deleteReview = useCallback(async (reviewId: string) => {
    if (!isAuthenticated || !token) return false
    setLoading(true)
    try {
      await reviewsAPI.deleteReview(reviewId, token)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token])

  return { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview }
}