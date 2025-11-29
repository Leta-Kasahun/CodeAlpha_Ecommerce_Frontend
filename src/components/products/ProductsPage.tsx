// Products page using reusable search and cart hooks
// Path: src/components/products/ProductsPage.tsx

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearch } from '@/src/hooks/useSearch'
import { useProductRatings } from '@/src/hooks/useProductRatings'
import { ProductsGrid } from './ProductsGrid'
import { ProductFilters } from './ProductFilters'
import { SearchBox } from '@/src/components/search/SearchBox'

export function ProductsPage() {
  const searchParams = useSearchParams()
  const { products, loading, error, searchProducts } = useSearch()
  const { getProductsRatings } = useProductRatings()
  const [productsWithRatings, setProductsWithRatings] = useState<any[]>([])
  
  const category = searchParams.get('category')
  const search = searchParams.get('q')

  // Fetch products
  useEffect(() => {
    const filters: any = {}
    if (category) filters.category = category
    if (search) filters.q = search
    
    searchProducts(filters)
  }, [category, search, searchProducts])

  // Fetch ratings when products change
  useEffect(() => {
    const loadProductRatings = async () => {
      if (products.length > 0) {
        const productIds = products.map((p: any) => p._id)
        const ratings = await getProductsRatings(productIds)
        
        // Merge products with their ratings
        const enhancedProducts = products.map((product: any) => ({
          ...product,
          averageRating: ratings[product._id]?.averageRating || 0,
          reviewCount: ratings[product._id]?.reviewCount || 0,
          // You can add lastReviewDate here if you have the data
        }))
        
        setProductsWithRatings(enhancedProducts)
      } else {
        setProductsWithRatings([])
      }
    }

    if (!loading && products.length > 0) {
      loadProductRatings()
    }
  }, [products, loading, getProductsRatings])

  const handleSearch = (query: string) => {
    const filters: any = { q: query }
    if (category) filters.category = category
    searchProducts(filters)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header - UNCHANGED */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing products for every need
          </p>
        </div>

        {/* Search and Filters - UNCHANGED */}
        <div className="mb-8 space-y-4">
          <SearchBox 
            onSearch={handleSearch}
            className="max-w-md mx-auto"
          />
          <ProductFilters />
        </div>

        {/* Updated Products Grid with review data */}
        <ProductsGrid 
          products={productsWithRatings.length > 0 ? productsWithRatings : products}
          loading={loading}
          error={error}
          onRetry={() => searchProducts({ category, q: search })}
          showRatings={true} // Enable ratings display
        />
      </div>
    </div>
  )
}