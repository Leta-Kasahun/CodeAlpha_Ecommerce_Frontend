// src/components/dashboard/ReviewStats.tsx
// Modern review statistics with real data

'use client'

import { Star, ThumbsUp, MessageSquare, Award, TrendingUp } from 'lucide-react'
import { useReviews } from '@/src/hooks/useReviews'
import { useAuthStore } from '@/src/stores'

export function ReviewStats() {
  const { user } = useAuthStore()
  const { reviews } = useReviews()

  // Calculate stats from real data
  const userReviews = reviews.filter(review => 
    (typeof review.user === 'object' ? review.user._id : review.user) === user?._id
  )

  const totalReviews = userReviews.length
  const averageRating = userReviews.length > 0 
    ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length 
    : 0
  const helpfulVotes = userReviews.reduce((sum, review) => sum + (review.likes || 0), 0)
  
  // Determine reviewer level based on activity
  const getReviewerLevel = () => {
    if (totalReviews >= 10) return 'Expert'
    if (totalReviews >= 5) return 'Contributor'
    if (totalReviews >= 1) return 'Starter'
    return 'Beginner'
  }

  const reviewStats = [
    { 
      name: 'Total Reviews', 
      value: totalReviews.toString(), 
      icon: MessageSquare, 
      description: 'Reviews written',
      trend: '+2 this month',
      color: 'text-blue-600'
    },
    { 
      name: 'Average Rating', 
      value: averageRating.toFixed(1), 
      icon: Star, 
      description: 'Your average score',
      trend: 'Consistent',
      color: 'text-[#E6B84A]'
    },
    { 
      name: 'Helpful Votes', 
      value: helpfulVotes.toString(), 
      icon: ThumbsUp, 
      description: 'Times helped others',
      trend: '+5 recently',
      color: 'text-green-600'
    },
    { 
      name: 'Reviewer Level', 
      value: getReviewerLevel(), 
      icon: Award, 
      description: 'Based on activity',
      trend: 'Keep going!',
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {reviewStats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-2">{stat.description}</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
              </div>
            </div>
            <div className={`p-3 bg-opacity-10 rounded-xl ${stat.color.replace('text-', 'bg-')}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}