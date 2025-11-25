// src/components/seller/SellerStats.tsx
// Seller statistics cards with brand colors

'use client'

import { Package, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'

const stats = [
  { 
    name: 'Total Products', 
    value: '24', 
    icon: Package, 
    change: '+12%',
    color: 'bg-[#5156D2]'
  },
  { 
    name: 'Total Orders', 
    value: '156', 
    icon: ShoppingCart, 
    change: '+8%',
    color: 'bg-[#5156D2]'
  },
  { 
    name: 'Revenue', 
    value: '$3,240', 
    icon: DollarSign, 
    change: '+23%',
    color: 'bg-[#E6B84A]'
  },
  { 
    name: 'Growth Rate', 
    value: '18.2%', 
    icon: TrendingUp, 
    change: '+5%',
    color: 'bg-[#E6B84A]'
  }
]

export function SellerStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 ${stat.color} rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}