'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
  { value: '', label: 'All' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'bags', label: 'Bags' },
  { value: 'footwear', label: 'Footwear' }
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || ''

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleCategoryChange(category.value)}
          className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
            currentCategory === category.value
              ? 'bg-[#5156D2] text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}