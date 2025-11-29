// Featured products with working cart functionality and review ratings
// Path: src/components/home/FeaturedProducts.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { productsAPI } from '@/src/lib/api/products'
import { useProductRatings } from '@/src/hooks/useProductRatings'
import { AddToCartButton } from '@/src/components/cart/AddToCartButton'
import { StarRating } from '@/src/components/reviews/StarRating'

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { getProductsRatings } = useProductRatings()
  const router = useRouter()

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getProducts()
        const allProducts = response.products || response || []
        const featuredProducts = allProducts.slice(0, 8)
        
        // Load ratings for featured products
        if (featuredProducts.length > 0) {
          const productIds = featuredProducts.map((p: any) => p._id)
          const ratings = await getProductsRatings(productIds)
          
          // Merge products with their ratings
          const productsWithRatings = featuredProducts.map((product: any) => ({
            ...product,
            averageRating: ratings[product._id]?.averageRating || 0,
            reviewCount: ratings[product._id]?.reviewCount || 0
          }))
          
          setProducts(productsWithRatings)
        } else {
          setProducts(featuredProducts)
        }
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [getProductsRatings])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse text-gray-600">Loading featured products...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="text-gray-600">Discover our latest collection</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image - UNCHANGED */}
                <div 
                  className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)}
                >
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Product Image</span>
                    </div>
                  )}
                </div>

                {/* Product Info - UPDATED with review ratings */}
                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                  
                  {/* NEW: Review Ratings */}
                  <div className="flex items-center gap-2">
                    {product.averageRating > 0 ? (
                      <>
                        <StarRating 
                          rating={product.averageRating} 
                          size={14} 
                          readonly 
                        />
                        <span className="text-xs text-gray-600">
                          ({product.reviewCount || 0})
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">No reviews yet</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg md:text-xl font-bold text-[#5156D2]">
                      ${product.price}
                    </span>
                    <AddToCartButton
                      productId={product._id}
                      productName={product.name}
                      disabled={!product.isAvailable || product.quantity === 0}
                      size="sm"
                      showText={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">No products available at the moment</p>
          </div>
        )}
      </div>
    </section>
  )
}