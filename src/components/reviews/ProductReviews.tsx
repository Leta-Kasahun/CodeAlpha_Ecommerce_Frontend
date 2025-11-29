// File: src/components/reviews/ProductReviews.tsx
'use client'

import { useState, useEffect } from 'react'
import { useReviews } from '@/src/hooks/useReviews'
import { ReviewForm } from './ReviewForm'
import { ReviewList } from './ReviewList'
import { useAuthStore } from '@/src/stores'

export const ProductReviews = ({ productId }: { productId: string }) => {
  const { reviews, loading, error, fetchReviews, createReview, updateReview, deleteReview } = useReviews(productId)
  const { user } = useAuthStore()
  const [editingReview, setEditingReview] = useState<any>(null)

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleSubmit = async (data: { rating: number; comment: string }) => {
    const success = editingReview 
      ? await updateReview(editingReview._id, data)
      : await createReview(data)
    
    if (success) {
      setEditingReview(null)
      fetchReviews()
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (confirm('Delete this review?')) {
      const success = await deleteReview(reviewId)
      if (success) fetchReviews()
    }
  }

  const userReview = reviews.find(r => 
    (typeof r.user === 'object' ? r.user._id : r.user) === user?._id
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Reviews ({reviews.length})</h3>
        {!userReview && !editingReview && user && (
          <button 
            onClick={() => setEditingReview({})}
            className="px-3 py-1 bg-[#5156D2] text-white rounded-lg text-sm"
          >
            Write Review
          </button>
        )}
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {(editingReview || (!userReview && user)) && (
        <ReviewForm
          productId={productId}
          onSubmit={handleSubmit}
          loading={loading}
          editReview={editingReview}
          onCancel={() => setEditingReview(null)}
        />
      )}

      <ReviewList
        reviews={reviews}
        onEdit={setEditingReview}
        onDelete={handleDelete}
        currentUserId={user?._id}
      />
    </div>
  )
}