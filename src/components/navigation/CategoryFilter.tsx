// src/components/navigation/CategoryFilter.tsx
'use client'

import { Filter } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  
  const currentCategory = searchParams.get('category') || ''

  const categories = [
    { value: '', label: 'All Products' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'bags', label: 'Bags' },
    { value: 'footwear', label: 'Footwear' }
  ]

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    // Keep the user on the current seller page, just update the query
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-5 w-5 text-gray-500" />
      <select
        value={currentCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent w-48"
      >
        {categories.map((category) => (
          <option key={category.value || 'all'} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}