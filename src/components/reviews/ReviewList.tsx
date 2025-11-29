// File: src/components/reviews/ReviewList.tsx
'use client'

import { Review } from '@/src/types'
import { StarRating } from './StarRating'
import { Edit3, Trash2, User } from 'lucide-react'

interface ReviewListProps {
  reviews: Review[]
  onEdit?: (review: Review) => void
  onDelete?: (reviewId: string) => void
  currentUserId?: string
}

export const ReviewList = ({ reviews, onEdit, onDelete, currentUserId }: ReviewListProps) => {
  const isUserReview = (review: Review) => {
    if (!currentUserId) return false
    const reviewUserId = typeof review.user === 'object' ? review.user._id : review.user
    // SAFE COMPARISON: Convert both to string
    return reviewUserId.toString() === currentUserId.toString()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const userOwnsReview = isUserReview(review)
        const userName = typeof review.user === 'object' ? review.user.name : 'User'
        
        return (
          <div key={review._id} className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Header with user info and actions */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{userName}</h4>
                  <p className="text-gray-500 text-xs">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              
              {/* Actions - Only show if user owns review */}
              {userOwnsReview && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit?.(review)} 
                    className="text-[#5156D2] hover:text-[#4347c4] transition-colors p-1 rounded"
                    title="Edit review"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDelete?.(review._id)} 
                    className="text-red-600 hover:text-red-700 transition-colors p-1 rounded"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-2">
              <StarRating rating={review.rating} size={16} readonly />
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}