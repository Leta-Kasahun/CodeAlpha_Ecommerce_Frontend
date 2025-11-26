// src/components/seller/SellerHeader.tsx
'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { SearchBar } from '../navigation/SearchBar'
import { NotificationsBell } from '../navigation/NotificationBell'
import { UserAvatar } from '../navigation/UserAvatar'
import { CategoryFilter } from '../navigation/CategoryFilter'

interface SellerHeaderProps {
  onToggleSidebar: () => void
}

export function SellerHeader({ onToggleSidebar }: SellerHeaderProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <CategoryFilter 
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />

          <SearchBar placeholder="Search products or orders..." className="hidden lg:block" />
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationsBell count={5} />
          <UserAvatar showName={true} />
        </div>
      </div>
    </header>
  )
}