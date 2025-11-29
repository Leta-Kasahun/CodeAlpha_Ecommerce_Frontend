// File: src/components/reviews/StarRating.tsx
// StarRating: displays and allows rating selection with visual stars
'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  size?: number
  readonly?: boolean
}

export const StarRating = ({ rating, onRatingChange, size = 20, readonly = false }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
        >
          <Star
            size={size}
            className={star <= rating ? 'text-[#E6B84A] fill-[#E6B84A]' : 'text-gray-300'}
          />
        </button>
      ))}
    </div>
  )
}