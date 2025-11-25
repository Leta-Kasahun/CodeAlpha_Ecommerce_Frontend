// src/components/seller/QuickActions.tsx
// Quick action buttons for sellers

'use client'

import { Plus, Edit3, BarChart3, Settings } from 'lucide-react'

const actions = [
  {
    name: 'Add Product',
    description: 'List new fashion items',
    icon: Plus,
    color: 'bg-[#5156D2] hover:bg-[#4645b5]',
    href: '/dashboard/seller/products/new'
  },
  {
    name: 'Manage Products',
    description: 'Edit existing items',
    icon: Edit3,
    color: 'bg-[#5156D2] hover:bg-[#4645b5]',
    href: '/dashboard/seller/products'
  },
  {
    name: 'View Analytics',
    description: 'Sales performance',
    icon: BarChart3,
    color: 'bg-[#E6B84A] hover:bg-[#d4a63f]',
    href: '/dashboard/seller/analytics'
  },
  {
    name: 'Store Settings',
    description: 'Update shop details',
    icon: Settings,
    color: 'bg-[#E6B84A] hover:bg-[#d4a63f]',
    href: '/dashboard/seller/settings'
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="p-4 text-left rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`p-2 ${action.color} rounded-lg w-12 h-12 flex items-center justify-center mb-3`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-900">{action.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}