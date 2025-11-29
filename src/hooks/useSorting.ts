'use client'

import { useState, useCallback } from 'react'
import { sortingAPI } from '@/src/lib/api/sorting'
import { SortOptions, SortResult } from '@/src/types/sorting'

export const useSorting = () => {
  const [sortedProducts, setSortedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortMeta, setSortMeta] = useState<Omit<SortResult, 'products' | 'success' | 'message'> | null>(null)

  const sortProducts = useCallback(async (options: SortOptions) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await sortingAPI.getSortedProducts(options)
      
      if (result.success) {
        setSortedProducts(result.products)
        setSortMeta({
          total: result.total,
          page: result.page,
          pages: result.pages,
          limit: result.limit,
          hasNext: result.hasNext,
          hasPrev: result.hasPrev,
          sortBy: result.sortBy,
          sortOrder: result.sortOrder
        })
      } else {
        setError(result.message || 'Failed to sort products')
      }
    } catch (err: any) {
      setError(err.message || 'Error sorting products')
    } finally {
      setLoading(false)
    }
  }, [])

  const clearSort = useCallback(() => {
    setSortedProducts([])
    setSortMeta(null)
    setError(null)
  }, [])

  return {
    sortedProducts,
    loading,
    error,
    sortMeta,
    sortProducts,
    clearSort
  }
}