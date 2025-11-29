// File: src/components/reviews/ReviewStats.tsx
'use client'

import { Review } from '@/src/types'
import { StarRating } from './StarRating'

interface ReviewStatsProps {
  reviews: Review[]
  averageRating: number
  reviewCount: number
}

export const ReviewStats = ({ reviews, averageRating, reviewCount }: ReviewStatsProps) => {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviewCount) * 100
  }))

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="mt-2">
            <StarRating rating={averageRating} size={20} readonly />
          </div>
          <div className="text-gray-600 text-sm mt-1">{reviewCount} reviews</div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-4">{rating}</span>
              <StarRating rating={1} size={12} readonly />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#E6B84A] h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}