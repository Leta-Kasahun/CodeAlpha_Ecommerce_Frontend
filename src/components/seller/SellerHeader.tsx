// src/components/seller/SellerHeader.tsx
// Seller header with navigation

'use client'

import { useAuthStore } from '@/src/stores'
import { Menu, Bell, User } from 'lucide-react'

interface SellerHeaderProps {
  onToggleSidebar: () => void
}

export function SellerHeader({ onToggleSidebar }: SellerHeaderProps) {
  const { user } = useAuthStore()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold text-gray-900">Seller Center</h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#5156D2] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Seller</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}