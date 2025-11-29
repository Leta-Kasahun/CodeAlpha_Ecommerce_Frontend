// File: src/components/reviews/ProductReviews.tsx - ENHANCED VERSION
'use client'

import { useState, useEffect } from 'react'
import { useReviews } from '@/src/hooks/useReviews'
import { useProductRatings } from '@/src/hooks/useProductRatings'
import { ReviewForm } from './ReviewForm'
import { ReviewStats } from './ReviewStats'
import { ReviewListWithFilters } from './ReviewListWithFilter'
import { useAuthStore } from '@/src/stores'

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview } = useReviews(productId)
  const { getProductRating } = useProductRatings()
  const { user } = useAuthStore()
  const [editingReview, setEditingReview] = useState<any>(null)
  const [ratingStats, setRatingStats] = useState({ averageRating: 0, reviewCount: 0 })

  useEffect(() => {
    fetchReviews()
  }, [productId])

  useEffect(() => {
    const loadRatingStats = async () => {
      const stats = await getProductRating(productId)
      setRatingStats(stats)
    }
    if (reviews.length > 0) {
      loadRatingStats()
    }
  }, [reviews, productId, getProductRating])

  const handleCreateReview = async (data: { rating: number; comment: string }) => {
    const success = await createReview(data)
    if (success) {
      fetchReviews()
    }
    return success
  }

  const handleUpdateReview = async (data: { rating: number; comment: string }) => {
    if (!editingReview) return false
    const success = await updateReview(editingReview._id, data)
    if (success) {
      setEditingReview(null)
      fetchReviews()
    }
    return success
  }

  const handleDelete = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      const success = await deleteReview(reviewId)
      if (success) {
        fetchReviews()
      }
    }
  }

  const userReview = reviews.find(r => 
    (typeof r.user === 'object' ? r.user._id : r.user) === user?._id
  )

  const isCreating = !userReview && !editingReview && user
  const isEditing = !!editingReview

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <ReviewStats 
        reviews={reviews}
        averageRating={ratingStats.averageRating}
        reviewCount={ratingStats.reviewCount}
      />

      {/* Review Form & List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Reviews ({reviews.length})
          </h3>
          
          {isCreating && (
            <button 
              onClick={() => setEditingReview(null)}
              className="px-4 py-2 bg-[#5156D2] text-white rounded-lg text-sm font-medium hover:bg-[#4347C2] transition-colors"
            >
              Write Review
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {(isCreating || isEditing) && (
          <ReviewForm
            productId={productId}
            onSubmit={isEditing ? handleUpdateReview : handleCreateReview}
            loading={loading}
            editReview={editingReview || undefined}
            onCancel={() => setEditingReview(null)}
          />
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <ReviewListWithFilters
            reviews={reviews}
            onEdit={setEditingReview}
            onDelete={handleDelete}
            currentUserId={user?._id}
          />
        ) : (
          <div className="text-center py-8 border border-gray-200 rounded-lg">
            <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  )
}