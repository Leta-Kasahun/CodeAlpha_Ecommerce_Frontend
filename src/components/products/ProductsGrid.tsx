// Products grid with view details button
// Path: src/components/products/ProductsGrid.tsx

'use client'

import { Package, Eye } from 'lucide-react'
import { AddToCartButton } from '@/src/components/cart/AddToCartButton'
import { ProductsGridSkeleton } from './ProductsGridSkeleton'
import { Button } from '@/src/components/ui/button'

interface ProductsGridProps {
  products: any[]
  loading: boolean
  error: string
  onRetry: () => void
}

export function ProductsGrid({ products, loading, error, onRetry }: ProductsGridProps) {
  if (loading) {
    return <ProductsGridSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200 mb-4 inline-block">
          {error}
        </div>
        <br />
        <Button
          onClick={onRetry}
          className="bg-[#5156D2] hover:bg-[#5156D2]/90 text-white"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Product Image */}
          <div 
            className="aspect-square bg-gray-100 relative overflow-hidden cursor-pointer"
            onClick={() => window.location.href = `/products/${product._id}`}
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

          {/* Product Info */}
          <div className="p-4 space-y-3 flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 flex-1">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between mt-auto space-x-2">
              <span className="text-lg md:text-xl font-bold text-[#5156D2]">
                ${product.price}
              </span>
              
              <div className="flex space-x-1">
                {/* View Details Button */}
                <Button
                  onClick={() => window.location.href = `/products/${product._id}`}
                  className="bg-white text-[#5156D2] hover:bg-gray-100 border border-[#5156D2] p-2"
                  size="sm"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                {/* Add to Cart Button */}
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
        </div>
      ))}
    </div>
  )
}