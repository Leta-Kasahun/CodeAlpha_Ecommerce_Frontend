// src/components/dashboard/DashboardStats.tsx
// Dashboard statistics cards showing user activity and fashion metrics

'use client'

import { Package, ShoppingCart, Heart, TrendingUp, Eye, Clock, CheckCircle, Users } from 'lucide-react'

const stats = [
  { name: 'Total Orders', value: '12', icon: ShoppingCart, change: '+4%', trend: 'up' },
  { name: 'Wishlist Items', value: '8', icon: Heart, change: '+2%', trend: 'up' },
  { name: 'Products Viewed', value: '47', icon: Eye, change: '+12%', trend: 'up' },
  { name: 'Style Points', value: '1,240', icon: TrendingUp, change: '+18%', trend: 'up' },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} mt-1 flex items-center`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </p>
            </div>
            <div className="p-3 bg-[#5156D2] bg-opacity-10 rounded-lg">
              <stat.icon className="h-6 w-6 text-[#5156D2]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}