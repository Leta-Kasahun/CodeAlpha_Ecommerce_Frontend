// src/components/dashboard/Navbar.tsx
'use client'

import { Menu } from 'lucide-react'
import { SellerButton } from './SellButton'
import { SearchBox } from '../search/SearchBox'
import { NotificationsBell } from '../navigation/NotificationBell'
import { UserAvatar } from '../navigation/UserAvatar'

interface NavbarProps {
  onToggleSidebar: () => void
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <div className="flex items-center justify-between w-full px-6 py-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <SearchBox placeholder="Search fashion items..." className="hidden md:block" />
      </div>
      
      <div className="flex items-center space-x-4">
        <SellerButton />
        <NotificationsBell count={3} />
        <UserAvatar showName={true} />
      </div>
    </div>
  )
}