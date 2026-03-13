// Reusable search hook for all components
// Path: src/hooks/useSearch.ts

'use client'

import { useState, useCallback } from 'react'
import { searchAPI } from '@/src/lib/api/search'

interface UseSearchReturn {
  products: any[]
  loading: boolean
  error: string
  total: number
  page: number
  hasNext: boolean
  hasPrev: boolean
  searchProducts: (filters: any) => Promise<void>
  getSuggestions: (query: string) => Promise<any[]>
  getPopularSearches: () => Promise<string[]>
  clearError: () => void
}

export function useSearch(): UseSearchReturn {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const searchProducts = useCallback(async (filters: any = {}) => {
    try {
      setLoading(true)
      setError('')
      
      const response = await searchAPI.searchProducts(filters)
      setProducts(response.products)
      setTotal(response.total)
      setPage('page' in response && typeof response.page === 'number' ? response.page : 1)
      setHasNext('hasNext' in response ? Boolean(response.hasNext) : false)
      setHasPrev('hasPrev' in response ? Boolean(response.hasPrev) : false)
    } catch {
      setError('Failed to search products')
    } finally {
      setLoading(false)
    }
  }, [])

  const getSuggestions = useCallback(async (query: string): Promise<any[]> => {
    if (!query || query.length < 2) return []
    
    try {
      const response = (await searchAPI.getSearchSuggestions({ q: query })) as
        | string[]
        | { suggestions?: string[] }
      return Array.isArray(response) ? response : response.suggestions || []
    } catch {
      return []
    }
  }, [])

  const getPopularSearches = useCallback(async (): Promise<string[]> => {
    try {
      const response = (await searchAPI.getPopularSearches()) as
        | string[]
        | { popularSearches?: string[] }
      return Array.isArray(response) ? response : response.popularSearches || []
    } catch {
      return []
    }
  }, [])

  const clearError = () => setError('')

  return {
    products,
    loading,
    error,
    total,
    page,
    hasNext,
    hasPrev,
    searchProducts,
    getSuggestions,
    getPopularSearches,
    clearError
  }
}