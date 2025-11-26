// src/components/navigation/NotificationsBell.tsx
'use client'

import { Bell } from 'lucide-react'

interface NotificationsBellProps {
  count?: number
  className?: string
}

export function NotificationsBell({ count = 0, className = "" }: NotificationsBellProps) {
  return (
    <button className={`p-2 text-gray-400 hover:text-gray-600 relative ${className}`}>
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#E6B84A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}