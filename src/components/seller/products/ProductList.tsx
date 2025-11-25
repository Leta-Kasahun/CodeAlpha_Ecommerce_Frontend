// Product list component for seller dashboard with responsive design
// Path: src/components/seller/products/ProductList.tsx

'use client'

import { useState, useEffect } from 'react'
import { Package } from 'lucide-react'
import { useSellerProducts } from '@/src/hooks/useSellerProducts'
import { ProductCard } from './ProductCard'
import { ProductListSkeleton } from './ProductListSkeleton'
import { Button } from '@/src/components/ui/button'

interface ProductListProps {
  onEdit: (product: any) => void
}

export function ProductList({ onEdit }: ProductListProps) {
  const { products, loading, error, loadProducts, deleteProduct } = useSellerProducts()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      loadProducts()
    }
  }, [mounted])

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setDeletingId(productId)
      try {
        await deleteProduct(productId)
      } finally {
        setDeletingId(null)
      }
    }
  }

  const handleRetry = () => {
    loadProducts()
  }

  if (!mounted || loading) {
    return <ProductListSkeleton />
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-8 text-center">
        <div className="text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200 mb-4">
          {error}
        </div>
        <Button
          onClick={handleRetry}
          className="bg-[#5156D2] hover:bg-[#5156D2]/90 text-white text-sm md:text-base"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Your Products ({products.length})
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-12 text-center">
          <Package className="h-12 w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-3 md:mb-4" />
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 text-sm md:text-base">
            You haven't created any products yet.
          </p>
          <Button
            onClick={() => onEdit(null)}
            className="mt-4 bg-[#5156D2] hover:bg-[#5156D2]/90 text-white"
          >
            Create Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === product._id}
            />
          ))}
        </div>
      )}
    </div>
  )
}