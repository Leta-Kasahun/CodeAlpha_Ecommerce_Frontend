// src/components/dashboard/ReviewStats.tsx
// Review statistics showing user's review activity and impact

'use client'

import { Star, ThumbsUp, MessageSquare, Award } from 'lucide-react'

const reviewStats = [
  { name: 'Total Reviews', value: '8', icon: MessageSquare, description: 'Reviews written' },
  { name: 'Average Rating', value: '4.6', icon: Star, description: 'Your average score' },
  { name: 'Helpful Votes', value: '42', icon: ThumbsUp, description: 'Times helped others' },
  { name: 'Reviewer Level', value: 'Expert', icon: Award, description: 'Based on activity' }
]

export function ReviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {reviewStats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </div>
            <div className="p-3 bg-[#5156D2] bg-opacity-10 rounded-lg">
              <stat.icon className="h-6 w-6 text-[#5156D2]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}