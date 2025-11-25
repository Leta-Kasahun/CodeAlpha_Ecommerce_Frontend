// src/components/dashboard/ReviewSection.tsx
// Review section showing user's product reviews and ratings

'use client'

import { Star, Calendar, ThumbsUp, MessageSquare } from 'lucide-react'

const userReviews = [
  { 
    id: '1', 
    product: 'Designer Handbag', 
    rating: 5, 
    comment: 'Excellent quality and perfect size for daily use. The leather feels premium.',
    date: '2024-01-10',
    likes: 12,
    verified: true,
    images: ['/bag1.jpg', '/bag2.jpg']
  },
  { 
    id: '2', 
    product: 'Summer Dress', 
    rating: 4, 
    comment: 'Beautiful design but runs a bit small. Would recommend sizing up.',
    date: '2024-01-08',
    likes: 8,
    verified: true,
    images: ['/dress1.jpg']
  },
  { 
    id: '3', 
    product: 'Sneakers', 
    rating: 5, 
    comment: 'Very comfortable and true to size. Great for everyday wear.',
    date: '2024-01-05',
    likes: 15,
    verified: true,
    images: []
  }
]

export function ReviewSection() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">My Reviews</h2>
        <p className="text-gray-600 text-sm mt-1">Your feedback on fashion items</p>
      </div>
      <div className="divide-y divide-gray-200">
        {userReviews.map((review) => (
          <div key={review.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{review.product}</h3>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-[#E6B84A] fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>{review.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-3">{review.comment}</p>
                
                {review.images.length > 0 && (
                  <div className="flex space-x-2 mt-3">
                    {review.images.map((img, index) => (
                      <div key={index} className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-400">Image</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.likes} helpful</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 text-sm">
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}