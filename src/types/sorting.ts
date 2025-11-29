export interface SortOptions {
  sortBy: 'createdAt' | 'price' | 'name' | 'rating'
  sortOrder: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface SortResult {
  success: boolean
  message: string
  products: any[]
  total: number
  page: number
  pages: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
  sortBy: string
  sortOrder: string
}