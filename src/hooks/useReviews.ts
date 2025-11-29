// File: src/hooks/useReviews.ts
'use client'

import { useState, useCallback } from 'react'
import { reviewsAPI } from '@/src/lib/api/reviews'
import { useAuthStore } from '@/src/stores'
import { Review, CreateReviewData, UpdateReviewData } from '@/src/types'

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, isAuthenticated } = useAuthStore()

  const fetchReviews = useCallback(async () => {
    if (!productId) return
    setLoading(true)
    setError(null)
    try {
      const response = await reviewsAPI.getProductReviews(productId)
      if (response.success) {
        setReviews(response.reviews || [])
      } else {
        setError(response.message || 'Failed to fetch reviews')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [productId])

  const createReview = useCallback(async (data: CreateReviewData) => {
    if (!isAuthenticated || !token || !productId) {
      setError('Authentication required')
      return false
    }
    setLoading(true)
    setError(null)
    try {
      const response = await reviewsAPI.createReview({ ...data, product: productId }, token)
      if (response.success) {
        await fetchReviews() // Refresh the list
        return true
      } else {
        setError(response.message || 'Failed to create review')
        return false
      }
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, productId, fetchReviews])

  const updateReview = useCallback(async (reviewId: string, data: UpdateReviewData) => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return false
    }
    setLoading(true)
    setError(null)
    try {
      const response = await reviewsAPI.updateReview(reviewId, data, token)
      if (response.success) {
        await fetchReviews() // Refresh the list
        return true
      } else {
        setError(response.message || 'Failed to update review')
        return false
      }
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, fetchReviews])

  const deleteReview = useCallback(async (reviewId: string) => {
    if (!isAuthenticated || !token) {
      setError('Authentication required')
      return false
    }
    setLoading(true)
    setError(null)
    try {
      const response = await reviewsAPI.deleteReview(reviewId, token)
      if (response.success) {
        await fetchReviews() // Refresh the list
        return true
      } else {
        setError(response.message || 'Failed to delete review')
        return false
      }
    } catch (err: any) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, token, fetchReviews])

  return { 
    reviews, 
    loading, 
    error, 
    fetchReviews, 
    createReview, 
    updateReview, 
    deleteReview 
  }
}