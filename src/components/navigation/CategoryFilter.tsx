// src/components/navigation/CategoryFilter.tsx
'use client'

import { useState } from 'react'
import { ChevronDown, Shirt, Footprints, Briefcase, Gem, Zap } from 'lucide-react'

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void
  selectedCategory?: string
  placeholder?: string
}

const categories = [
  { id: 'all', name: 'All Categories', icon: Zap },
  { id: 'clothes', name: 'Clothes', icon: Shirt },
  { id: 'shoes', name: 'Shoes', icon: Footprints },
  { id: 'bags', name: 'Bags', icon: Briefcase },
  { id: 'accessories', name: 'Accessories', icon: Gem },
]

export function CategoryFilter({ 
  onCategoryChange, 
  selectedCategory = 'all',
  placeholder = "Filter by category" 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedCat = categories.find(cat => cat.id === selectedCategory) || categories[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-[#5156D2] focus:border-transparent transition-colors"
      >
        <selectedCat.icon className="h-4 w-4 text-[#5156D2]" />
        <span className="text-sm text-gray-700">{selectedCat.name}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 px-3 py-2">{placeholder}</p>
              {categories.map((category) => {
                const IconComponent = category.icon
                const isSelected = selectedCategory === category.id
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id)
                      setIsOpen(false)
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors ${
                      isSelected
                        ? 'bg-[#5156D2] text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#5156D2]'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.name}</span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 bg-[#E6B84A] rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}