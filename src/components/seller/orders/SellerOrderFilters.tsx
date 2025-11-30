// File: src/components/seller/orders/SellerOrderFilters.tsx
'use client'

import { Filter } from 'lucide-react'

interface SellerOrderFiltersProps {
  filters: {
    status: string
    page: number
    limit: number
  }
  onFiltersChange: (filters: Partial<{ status: string; page: number; limit: number }>) => void
}

export function SellerOrderFilters({ filters, onFiltersChange }: SellerOrderFiltersProps) {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Results Per Page */}
          <select
            value={filters.limit}
            onChange={(e) => onFiltersChange({ limit: Number(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>
    </div>
  )
}