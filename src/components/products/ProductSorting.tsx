'use client'

import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface ProductSortingProps {
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  currentSort?: string
  currentOrder?: 'asc' | 'desc'
  loading?: boolean
}

export function ProductSorting({ 
  onSort, 
  currentSort = 'createdAt', 
  currentOrder = 'desc',
  loading = false 
}: ProductSortingProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: 'createdAt', label: 'Newest', icon: ArrowUpDown },
    { value: 'price', label: 'Price', icon: ArrowUpDown },
    { value: 'name', label: 'Name', icon: ArrowUpDown },
    { value: 'rating', label: 'Rating', icon: ArrowUpDown }
  ]

  const handleSort = (sortBy: string) => {
    // Toggle order if same sort is selected, otherwise default to desc
    const newOrder = sortBy === currentSort ? 
      (currentOrder === 'asc' ? 'desc' : 'asc') : 'desc'
    
    onSort(sortBy, newOrder)
    setIsOpen(false)
  }

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort)
    return option ? `${option.label} ${currentOrder === 'asc' ? '↑' : '↓'}` : 'Sort By'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowUpDown className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{getCurrentSortLabel()}</span>
        {loading && (
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[#5156D2]"></div>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-2 space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                  currentSort === option.value
                    ? 'bg-[#5156D2] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
                {currentSort === option.value && (
                  currentOrder === 'asc' ? 
                    <ArrowUp className="h-3 w-3" /> : 
                    <ArrowDown className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}