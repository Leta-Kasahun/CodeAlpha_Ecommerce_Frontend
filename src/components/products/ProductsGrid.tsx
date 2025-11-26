// Products grid component with cart functionality
// Path: src/components/products/ProductsGrid.tsx

'use client'

import { Package } from 'lucide-react'
import { useCartStore } from '@/src/stores'
import { ProductCard } from './ProductCard'
import { ProductsGridSkeleton } from './ProductsGridSkeleton'
import { Button } from '@/src/components/ui/button'

interface ProductsGridProps {
  products: any[]
  loading: boolean
  error: string
  onRetry: () => void
}

export function ProductsGrid({ products, loading, error, onRetry }: ProductsGridProps) {
  const { addItem } = useCartStore()

  const handleAddToCart = (product: any) => {
    addItem(product, 1)
  }

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
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  )
}