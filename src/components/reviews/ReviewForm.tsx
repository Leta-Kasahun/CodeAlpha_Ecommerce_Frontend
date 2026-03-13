// File: src/components/reviews/ReviewForm.tsx
'use client'

import { useState } from 'react'
import { StarRating } from './StarRating'

interface ReviewFormProps {
  productId: string
  onSubmit: (data: { rating: number; comment: string }) => Promise<boolean>
  loading?: boolean
  editReview?: { rating: number; comment: string }
  onCancel?: () => void
}

export const ReviewForm = ({ onSubmit, loading, editReview, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(editReview?.rating || 0)
  const [comment, setComment] = useState(editReview?.comment || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return
    
    const success = await onSubmit({ rating, comment })
    if (success && !editReview) {
      setRating(0)
      setComment('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-3">
        {editReview ? 'Edit Review' : 'Write a Review'}
      </h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Rating *</label>
          <StarRating 
            rating={rating} 
            onRatingChange={setRating} 
            size={20} 
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || rating === 0}
            className="px-4 py-2 bg-[#5156D2] text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-[#4347C2] transition-colors"
          >
            {loading ? 'Submitting...' : editReview ? 'Update Review' : 'Submit Review'}
          </button>
          {editReview && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}