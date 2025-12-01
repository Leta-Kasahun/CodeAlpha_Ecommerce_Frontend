// File: src/components/seller/SellerHeader.tsx
'use client'

import { Menu } from 'lucide-react'
import { NotificationsBell } from '../navigation/NotificationBell'
import { UserAvatar } from '../navigation/UserAvatar'
import { SearchBox } from '../search/SearchBox'
import { CategoryFilter } from '../navigation/CategoryFilter'

interface SellerHeaderProps {
  onToggleSidebar: () => void
}

export function SellerHeader({ onToggleSidebar }: SellerHeaderProps) {
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
          
          {/* Category Filter */}
           <CategoryFilter/>
          
          {/* Search Box */}
          <div className="hidden lg:flex items-center w-64">
            <SearchBox 
              placeholder="Search products or orders..."
              className="w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationsBell count={5} />
          <UserAvatar showName={true} />
        </div>
      </div>
    </header>
  )
}