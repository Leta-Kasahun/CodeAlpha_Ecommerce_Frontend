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
    return reviewUserId === currentUserId
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => {
        const userOwnsReview = isUserReview(review)
        
        return (
          <div key={review._id} className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6 text-gray-400" />
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {typeof review.user === 'object' ? review.user.name : 'User'}
                  </h4>
                  
                  {/* EDIT/DELETE ICONS - Right after user name */}
                  {userOwnsReview && (
                    <div className="flex gap-1 ml-2">
                      <button 
                        onClick={() => onEdit?.(review)} 
                        className="text-[#5156D2] hover:text-[#4347c4]"
                        title="Edit review"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => onDelete?.(review._id)} 
                        className="text-red-600 hover:text-red-700"
                        title="Delete review"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <StarRating rating={review.rating} size={12} readonly />
            </div>
            
            {review.comment && <p className="text-gray-700 text-sm mt-1">{review.comment}</p>}
          </div>
        )
      })}
    </div>
  )
}