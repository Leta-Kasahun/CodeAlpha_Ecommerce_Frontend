// Product search component
// Path: src/components/products/ProductSearch.tsx

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export function ProductSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    
    router.push(`/products?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
        />
      </div>
    </form>
  )
}