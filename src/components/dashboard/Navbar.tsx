// src/components/dashboard/Navbar.tsx
// Dashboard navbar with SellerButton

'use client'

import { useAuthStore } from '@/src/stores'
import { Menu, Search, Bell, User } from 'lucide-react'
import { SellerButton } from './SellButton'

interface NavbarProps {
  onToggleSidebar: () => void
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { user } = useAuthStore()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search fashion items..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent w-80 hidden md:block"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Seller Button */}
        <SellerButton />

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-gray-600 hidden sm:block">
          <Bell className="h-5 w-5" />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#5156D2] rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}