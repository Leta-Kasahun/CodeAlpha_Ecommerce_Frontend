// src/components/seller/RecentProducts.tsx
// Recent products list for sellers

'use client'

import { Eye, ShoppingCart, Star } from 'lucide-react'

const products = [
  {
    id: '1',
    name: 'Designer Handbag',
    price: 249,
    stock: 12,
    sales: 45,
    views: 234,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Summer Dress',
    price: 89,
    stock: 8,
    sales: 32,
    views: 187,
    rating: 4.5
  },
  {
    id: '3',
    name: 'Sneakers',
    price: 120,
    stock: 15,
    sales: 28,
    views: 156,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Sunglasses',
    price: 65,
    stock: 20,
    sales: 41,
    views: 198,
    rating: 4.6
  }
]

export function RecentProducts() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <div key={product.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-[#5156D2] font-semibold">${product.price}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-[#E6B84A] fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-gray-500">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm">{product.sales}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{product.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}