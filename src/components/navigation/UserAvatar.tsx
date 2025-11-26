// src/components/navigation/UserAvatar.tsx
'use client'

import { User } from 'lucide-react'
import { useAuthStore } from '@/src/stores'

interface UserAvatarProps {
  showName?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function UserAvatar({ showName = true, size = 'md', className = '' }: UserAvatarProps) {
  const { user } = useAuthStore()

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-10 h-10'
  }

  const getUserInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-[#5156D2] rounded-full flex items-center justify-center`}>
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name}
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        ) : (
          <span className="text-white font-semibold text-xs">
            {getUserInitials()}
          </span>
        )}
      </div>
      {showName && user && (
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
      )}
    </div>
  )
}