// File: src/components/seller/QuickActions.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Plus, Edit3, BarChart3, Settings, Package } from 'lucide-react'

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      name: 'Add Product',
      description: 'List new items in your store',
      icon: Plus,
      color: 'bg-[#5156D2]',
      hoverColor: 'hover:bg-[#4347c4]',
      onClick: () => router.push('/seller/products/new'),
      show: true
    },
    {
      name: 'My Products',
      description: 'Manage your product listings',
      icon: Package,
      color: 'bg-[#5156D2]',
      hoverColor: 'hover:bg-[#4347c4]',
      onClick: () => router.push('/seller/products'),
      show: true
    },
    {
      name: 'View Analytics',
      description: 'Track sales performance',
      icon: BarChart3,
      color: 'bg-[#E6B84A]',
      hoverColor: 'hover:bg-[#d4a53e]',
      onClick: () => router.push('/seller/analytics'),
      show: true
    },
    {
      name: 'Shop Settings',
      description: 'Update store information',
      icon: Settings,
      color: 'bg-[#E6B84A]',
      hoverColor: 'hover:bg-[#d4a53e]',
      onClick: () => router.push('/seller/settings/shop'),
      show: true
    },
    {
      name: 'Edit Products',
      description: 'Update existing items',
      icon: Edit3,
      color: 'bg-[#5156D2]',
      hoverColor: 'hover:bg-[#4347c4]',
      onClick: () => router.push('/seller/products'),
      show: false // Hidden on mobile
    }
  ]

  // Filter actions based on screen size
  const visibleActions = actions.filter(action => action.show)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-600 mt-1">Access important seller tools quickly</p>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {visibleActions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="p-3 sm:p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-2 sm:p-3 ${action.color} ${action.hoverColor} rounded-lg transition-colors group-hover:scale-105`}>
                <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{action.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 line-clamp-2">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
        
        {/* Mobile-only Add Product button */}
        <button
          onClick={() => router.push('/seller/products/new')}
          className="lg:hidden p-3 sm:p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-[#5156D2] hover:bg-[#4347c4] rounded-lg transition-colors group-hover:scale-105">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-medium text-gray-900">Add Product</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">List new items</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}