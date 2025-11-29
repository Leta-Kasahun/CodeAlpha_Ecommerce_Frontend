'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearch } from '@/src/hooks/useSearch'
import { useSorting } from '@/src/hooks/useSorting'
import { useProductRatings } from '@/src/hooks/useProductRatings'
import { ProductsGrid } from './ProductsGrid'
import { SearchBox } from '@/src/components/search/SearchBox'
import { ProductFilters } from './ProductFilters'
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react'

const sortOptions = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'price', label: 'Price' },
  { value: 'name', label: 'Name' },
  { value: 'rating', label: 'Rating' }
]

export function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { products, loading, error, searchProducts } = useSearch()
  const { sortedProducts, loading: sortLoading, error: sortError, sortMeta, sortProducts } = useSorting()
  const { getProductsRatings } = useProductRatings()
  
  const category = searchParams.get('category') || ''
  const search = searchParams.get('q') || ''
  
  const [currentSort, setCurrentSort] = useState('createdAt')
  const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>('desc')
  const [useSortedResults, setUseSortedResults] = useState(false)
  const [productsWithRatings, setProductsWithRatings] = useState<any[]>([])
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setCurrentSort(sortBy)
    setCurrentOrder(sortOrder)
    setUseSortedResults(true)
    setSortDropdownOpen(false)
    
    sortProducts({
      sortBy: sortBy as any,
      sortOrder,
      page: 1,
      limit: 12
    })
  }

  useEffect(() => {
    const filters: any = {}
    if (category) filters.category = category
    if (search) filters.q = search
    
    searchProducts(filters)
    setUseSortedResults(false)
  }, [category, search, searchProducts])

  useEffect(() => {
    const loadRatings = async () => {
      const targetProducts = useSortedResults ? sortedProducts : products
      if (targetProducts.length > 0) {
        const productIds = targetProducts.map((p: any) => p._id)
        const ratings = await getProductsRatings(productIds)
        
        const productsWithRatings = targetProducts.map((product: any) => ({
          ...product,
          averageRating: ratings[product._id]?.averageRating || 0,
          reviewCount: ratings[product._id]?.reviewCount || 0
        }))
        
        setProductsWithRatings(productsWithRatings)
      }
    }

    if ((useSortedResults && sortedProducts.length > 0) || (!useSortedResults && products.length > 0)) {
      loadRatings()
    }
  }, [products, sortedProducts, useSortedResults, getProductsRatings])

  const handleSearch = (query: string) => {
    const filters: any = { q: query }
    if (category) filters.category = category
    searchProducts(filters)
    setUseSortedResults(false)
  }

  const displayProducts = useSortedResults ? 
    (productsWithRatings.length > 0 ? productsWithRatings : sortedProducts) : 
    (productsWithRatings.length > 0 ? productsWithRatings : products)
  
  const displayLoading = loading || (useSortedResults && sortLoading)
  const displayError = error || (useSortedResults && sortError)

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort)
    const orderIcon = currentOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
    return option ? (
      <span className="flex items-center gap-2">
        {option.label} {orderIcon}
      </span>
    ) : 'Sort By'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Collection</h1>
          <p className="text-lg text-gray-600">Discover amazing products for every need</p>
        </div>

        <div className="mb-6">
          <SearchBox 
            onSearch={handleSearch}
            className="max-w-md mx-auto"
          />
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            <ProductFilters />
            
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                disabled={sortLoading}
                className="flex items-center gap-3 px-5 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{getCurrentSortLabel()}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2 space-y-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSort(option.value, currentOrder)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm rounded-md transition-colors ${
                          currentSort === option.value
                            ? 'bg-[#5156D2] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>{option.label}</span>
                        {currentSort === option.value && (
                          currentOrder === 'asc' ? 
                            <ArrowUp className="h-4 w-4" /> : 
                            <ArrowDown className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ProductsGrid 
          products={displayProducts}
          loading={displayLoading}
          error={displayError}
          onRetry={() => {
            if (useSortedResults) {
              sortProducts({ 
                sortBy: currentSort as any, 
                sortOrder: currentOrder, 
                page: 1, 
                limit: 12 
              })
            } else {
              searchProducts({ category, q: search })
            }
          }}
          onLoadMore={() => {
            if (useSortedResults && sortMeta) {
              sortProducts({ 
                sortBy: currentSort as any, 
                sortOrder: currentOrder, 
                page: sortMeta.page + 1, 
                limit: 12 
              })
            }
          }}
          hasMore={useSortedResults ? (sortMeta?.hasNext || false) : false}
          showRatings={true}
        />
      </div>
    </div>
  )
}