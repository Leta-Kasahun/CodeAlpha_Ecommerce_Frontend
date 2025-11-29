// File: src/components/reviews/StarRating.tsx
'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  size?: number
  readonly?: boolean
}

export const StarRating = ({ rating, onRatingChange, size = 20, readonly = false }: StarRatingProps) => {
  const handleStarClick = (star: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star)
    }
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-150`}
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            size={size}
            className={`${
              star <= rating 
                ? 'text-[#E6B84A] fill-[#E6B84A]' 
                : 'text-gray-300 fill-gray-100'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  )
}