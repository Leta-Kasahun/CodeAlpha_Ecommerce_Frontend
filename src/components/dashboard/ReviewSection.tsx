// src/components/dashboard/ReviewSection.tsx
// Modern review section showing user's real product reviews

'use client'

import { useState } from 'react'
import { Star, Calendar, ThumbsUp, MessageSquare, Edit3, Trash2, Image as ImageIcon } from 'lucide-react'
import { useReviews } from '@/src/hooks/useReviews'
import { useAuthStore } from '@/src/stores'
import { ReviewForm } from '@/src/components/reviews/ReviewForm'
import { StarRating } from '@/src/components/reviews/StarRating'

export function ReviewSection() {
  const { user } = useAuthStore()
  const { reviews, loading, deleteReview, updateReview } = useReviews()
  const [editingReview, setEditingReview] = useState<any>(null)

  // Filter reviews for current user
  const userReviews = reviews.filter(review => 
    (typeof review.user === 'object' ? review.user._id : review.user) === user?._id
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDelete = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await deleteReview(reviewId)
    }
  }

  const handleUpdate = async (data: { rating: number; comment: string }) => {
    if (editingReview) {
      await updateReview(editingReview._id, data)
      setEditingReview(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/60">
        <div className="p-6 border-b border-gray-200/60">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">My Reviews</h2>
            <p className="text-gray-600 text-sm mt-1">
              {userReviews.length} review{userReviews.length !== 1 ? 's' : ''} • Your feedback matters
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageSquare className="h-4 w-4" />
            <span>Community Impact</span>
          </div>
        </div>
      </div>

      {/* Editing Form */}
      {editingReview && (
        <div className="p-6 border-b border-gray-200/60 bg-gray-50/50">
          <ReviewForm
            productId={typeof editingReview.product === 'object' ? editingReview.product._id : editingReview.product}
            onSubmit={handleUpdate}
            editReview={{
              rating: editingReview.rating,
              comment: editingReview.comment || ''
            }}
            onCancel={() => setEditingReview(null)}
          />
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y divide-gray-200/60">
        {userReviews.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-500 mb-4">Start sharing your experiences with products</p>
          </div>
        ) : (
          userReviews.map((review) => (
            <div key={review._id} className="p-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Product & Date */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {typeof review.product === 'object' ? review.product.name : 'Product'}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-3 mb-4">
                    <StarRating rating={review.rating} size={18} readonly />
                    <span className="text-sm font-medium text-gray-700">
                      {review.rating}.0 out of 5
                    </span>
                  </div>
                  
                  {/* Comment */}
                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed mb-4 bg-gray-50/50 p-4 rounded-lg border border-gray-200/60">
                      {review.comment}
                    </p>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-[#5156D2] transition-colors px-3 py-2 rounded-lg hover:bg-[#5156D2]/5">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm font-medium">Helpful</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-[#5156D2] transition-colors px-3 py-2 rounded-lg hover:bg-[#5156D2]/5">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    
                    {/* Edit/Delete Actions */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setEditingReview(review)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-[#5156D2] transition-colors px-3 py-2 rounded-lg hover:bg-[#5156D2]/5"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(review._id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}