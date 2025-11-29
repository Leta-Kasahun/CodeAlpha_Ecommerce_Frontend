// File: src/components/reviews/ReviewListWithFilters.tsx
'use client'

import { useState, useMemo } from 'react'
import { Review } from '@/src/types'
import { ReviewList } from './ReviewList'
import { Filter, Calendar } from 'lucide-react'

interface ReviewListWithFiltersProps {
  reviews: Review[]
  onEdit?: (review: Review) => void
  onDelete?: (reviewId: string) => void
  currentUserId?: string
}

export const ReviewListWithFilters = ({ 
  reviews, 
  onEdit, 
  onDelete, 
  currentUserId 
}: ReviewListWithFiltersProps) => {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    // Apply rating filter
    if (ratingFilter) {
      filtered = filtered.filter(review => review.rating === ratingFilter)
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        default:
          return 0
      }
    })

    return filtered
  }, [reviews, ratingFilter, sortBy])

  const getDateRangeStats = () => {
    if (reviews.length === 0) return null
    
    const dates = reviews.map(review => new Date(review.createdAt))
    const oldest = new Date(Math.min(...dates.map(d => d.getTime())))
    const newest = new Date(Math.max(...dates.map(d => d.getTime())))
    
    return { oldest, newest }
  }

  const dateStats = getDateRangeStats()

  return (
    <div className="space-y-4">
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={ratingFilter || ''}
              onChange={(e) => setRatingFilter(e.target.value ? parseInt(e.target.value) : null)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="">All Ratings</option>
              {[5, 4, 3, 2, 1].map(rating => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {/* Date Range Stats */}
        {dateStats && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {dateStats.oldest.toLocaleDateString()} - {dateStats.newest.toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
        {ratingFilter && ` • Filtered by ${ratingFilter} stars`}
      </div>

      {/* Reviews List */}
      <ReviewList
        reviews={filteredAndSortedReviews}
        onEdit={onEdit}
        onDelete={onDelete}
        currentUserId={currentUserId}
      />
    </div>
  )
}