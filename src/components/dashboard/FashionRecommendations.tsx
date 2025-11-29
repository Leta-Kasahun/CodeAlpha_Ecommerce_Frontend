// src/components/dashboard/FashionRecommendations.tsx
// Real fashion recommendations based on highest reviewed products

'use client'

import { useState, useEffect } from 'react'
import { Star, ShoppingBag, Heart, TrendingUp } from 'lucide-react'
import { productsAPI } from '@/src/lib/api/products'
import { useProductRatings } from '@/src/hooks/useProductRatings'
import { AddToCartButton } from '@/src/components/cart/AddToCartButton'
import { StarRating } from '@/src/components/reviews/StarRating'

export function FashionRecommendations() {
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { getProductsRatings } = useProductRatings()

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        const response = await productsAPI.getProducts()
        const allProducts = response.products || response || []
        
        // Get ratings for all products
        const productIds = allProducts.map((p: any) => p._id)
        const ratings = await getProductsRatings(productIds)
        
        // Filter products with rating >= 4 and sort by highest rating
        const highRatedProducts = allProducts
          .map((product: any) => ({
            ...product,
            averageRating: ratings[product._id]?.averageRating || 0,
            reviewCount: ratings[product._id]?.reviewCount || 0
          }))
          .filter(product => product.averageRating >= 4)
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 4) // Top 4 highest rated products

        setRecommendedProducts(highRatedProducts)
      } catch (error) {
        console.error('Error loading recommendations:', error)
        setRecommendedProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadRecommendedProducts()
  }, [getProductsRatings])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
        <div className="p-6 border-b border-gray-200/60">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-40 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#5156D2]" />
              Highly Rated Fashion
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Top products with 4+ star ratings from our community
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {recommendedProducts.length} recommended items
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-6">
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div 
                key={product._id}
                className="border border-gray-200/60 rounded-xl p-4 hover:shadow-md transition-all duration-300 group bg-white"
              >
                {/* Product Image */}
                <div className="bg-gray-100 h-40 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
                      <span className="text-xs">Product Image</span>
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                    <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-[#E6B84A] text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{product.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#5156D2]">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <StarRating rating={product.averageRating} size={12} readonly />
                      <span>({product.reviewCount})</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <AddToCartButton
                    productId={product._id}
                    productName={product.name}
                    disabled={!product.isAvailable || product.quantity === 0}
                    size="sm"
                    className="w-full bg-[#5156D2] hover:bg-[#4645b5] text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </AddToCartButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No highly rated products yet
            </h3>
            <p className="text-gray-500">
              Products with 4+ star ratings will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}