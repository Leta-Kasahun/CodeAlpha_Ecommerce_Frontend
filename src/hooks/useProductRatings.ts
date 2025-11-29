// File: src/hooks/useProductRatings.ts
'use client'

import { useCallback } from 'react'
import { reviewsAPI } from '@/src/lib/api/reviews'
import { Review } from '@/src/types'

export const useProductRatings = () => {
  const getProductRating = useCallback(async (productId: string) => {
    try {
      const response = await reviewsAPI.getProductReviews(productId)
      
      if (!response.success || !response.reviews || response.reviews.length === 0) {
        return { averageRating: 0, reviewCount: 0 }
      }
      
      const reviews = response.reviews
      const totalRating = reviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length
      
      return {
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: reviews.length
      }
    } catch (error) {
      console.error('Error fetching product ratings:', error)
      return { averageRating: 0, reviewCount: 0 }
    }
  }, [])

  const getProductsRatings = useCallback(async (productIds: string[]) => {
    const ratings: Record<string, { averageRating: number; reviewCount: number }> = {}
    
    await Promise.all(
      productIds.map(async (productId) => {
        ratings[productId] = await getProductRating(productId)
      })
    )
    
    return ratings
  }, [getProductRating])

  return {
    getProductRating,
    getProductsRatings
  }
}