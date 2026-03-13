// File: src/components/seller/RecentProducts.tsx
'use client'

import { useSellerProducts } from '@/src/hooks/useSellerProducts'
import { Eye, ShoppingCart, Star, Package } from 'lucide-react'

export function RecentProducts() {
  const { products, loading } = useSellerProducts()

  const getCreatedAtTime = (createdAt?: string) => {
    if (!createdAt) return 0
    return new Date(createdAt).getTime()
  }

  // Get recent products (last 4 products)
  const recentProducts = products
    .sort((a, b) => getCreatedAtTime(b.createdAt) - getCreatedAtTime(a.createdAt))
    .slice(0, 4)

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-6 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-[#5156D2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-[#5156D2]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600">Start adding products to see them here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
        <p className="text-sm text-gray-600 mt-1">Latest products in your store</p>
      </div>
      <div className="divide-y divide-gray-200">
        {recentProducts.map((product) => (
          <div key={product._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-[#5156D2] font-semibold">${product.price}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.quantity > 10 
                      ? 'bg-green-100 text-green-800' 
                      : product.quantity > 0 
                      ? 'bg-[#E6B84A]/20 text-[#E6B84A]' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    Stock: {product.quantity}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-[#E6B84A] fill-current" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-1 text-gray-500" title="Sales">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm font-medium">0</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500" title="Views">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">0</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  product.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                {product.category && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {product.category}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                Added {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {products.length > 4 && (
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-[#5156D2] hover:text-[#4347c4] text-sm font-medium transition-colors">
            View all products ({products.length})
          </button>
        </div>
      )}
    </div>
  )
}