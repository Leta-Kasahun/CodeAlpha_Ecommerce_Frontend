// src/components/dashboard/FashionRecommendations.tsx
// Fashion product recommendations grid for clothing, accessories, and bags

'use client'

import { Star, ShoppingBag, Shirt, Footprints, Watch, Heart } from 'lucide-react'

const recommendations = [
  { id: '1', name: 'Designer Handbag', price: 249, category: 'bags', rating: 4.8, icon: ShoppingBag },
  { id: '2', name: 'Summer Dress', price: 89, category: 'clothing', rating: 4.5, icon: Shirt },
  { id: '3', name: 'Sneakers', price: 120, category: 'footwear', rating: 4.7, icon: Footprints },
  { id: '4', name: 'Sunglasses', price: 65, category: 'accessories', rating: 4.6, icon: Watch },
]

export function FashionRecommendations() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recommended For You</h2>
        <p className="text-gray-600 text-sm mt-1">Based on your browsing history</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {recommendations.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group">
            <div className="bg-gray-100 h-40 rounded-md mb-3 flex items-center justify-center relative">
              <item.icon className="h-12 w-12 text-gray-400" />
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#5156D2] font-semibold">${item.price}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-[#E6B84A] fill-current" />
                <span className="text-sm text-gray-600">{item.rating}</span>
              </div>
            </div>
            <button className="w-full mt-3 bg-[#5156D2] text-white py-2 rounded-lg text-sm hover:bg-[#4645b5] transition-colors flex items-center justify-center space-x-1">
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}