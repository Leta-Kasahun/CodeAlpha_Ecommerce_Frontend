// Reusable search box component for all pages
// Path: src/components/search/SearchBox.tsx

'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { useSearch } from '@/src/hooks/useSearch'
import { useRouter } from 'next/navigation'

interface SearchBoxProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export function SearchBox({ 
  placeholder = "Search products...", 
  className = "",
  onSearch 
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const { getSuggestions } = useSearch()
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = async (value: string) => {
    setQuery(value)
    
    if (value.length >= 2) {
      const results = await getSuggestions(value)
      setSuggestions(results)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        router.push(`/products?q=${encodeURIComponent(query)}`)
      }
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    if (suggestion.type === 'product') {
      router.push(`/products/${suggestion.id}`)
    } else if (suggestion.type === 'category') {
      router.push(`/products?category=${encodeURIComponent(suggestion.searchTerm)}`)
    }
    setShowSuggestions(false)
    setQuery('')
  }

  const clearSearch = () => {
    setQuery('')
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
            >
              {suggestion.type === 'product' && suggestion.image && (
                <img src={suggestion.image} alt="" className="w-8 h-8 object-cover rounded" />
              )}
              <div className="flex-1">
                <div className="font-medium text-sm">{suggestion.name}</div>
                {suggestion.type === 'product' && (
                  <div className="text-xs text-gray-500">${suggestion.price} • {suggestion.category}</div>
                )}
                {suggestion.type === 'category' && (
                  <div className="text-xs text-gray-500">Category</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}