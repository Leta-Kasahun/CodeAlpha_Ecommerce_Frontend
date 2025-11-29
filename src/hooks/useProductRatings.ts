// File: src/hooks/useProductRatings.ts
// useProductRatings: calculates average ratings for products
'use client'

import { useCallback } from 'react'
import { reviewsAPI } from '@/src/lib/api/reviews'

export const useProductRatings = () => {
  const getProductRating = useCallback(async (productId: string) => {
    try {
      const reviews = await reviewsAPI.getProductReviews(productId)
      if (!reviews.length) return { averageRating: 0, reviewCount: 0 }
      
      const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length
      
      return {
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: reviews.length
      }
    } catch (error) {
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