// src/lib/api/sorting.ts
import { SortOptions, SortResult } from '@/src/types/sorting'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ca-ecommerce-api.onrender.com'

export const sortingAPI = {
  getSortedProducts: async (options: SortOptions): Promise<SortResult> => {
    const { sortBy, sortOrder, page = 1, limit = 12 } = options
    
    const params = new URLSearchParams({
      sortBy,
      sortOrder,
      page: page.toString(),
      limit: limit.toString()
    })

    const response = await fetch(`${BACKEND_URL}/api/sort/products?${params}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch sorted products')
    }
    
    return response.json()
  }
}