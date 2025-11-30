// File: src/components/seller/analytics/MetricsGrid.tsx
'use client'

import { ShoppingCart, DollarSign, Package, Users } from 'lucide-react'

interface MetricsGridProps {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  activeProducts: number
}

export function MetricsGrid({ 
  totalOrders, 
  totalRevenue, 
  averageOrderValue, 
  activeProducts 
}: MetricsGridProps) {
  const metrics = [
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      color: 'bg-[#5156D2]',
      bgColor: 'bg-[#5156D2]/10'
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-[#E6B84A]',
      bgColor: 'bg-[#E6B84A]/10'
    },
    {
      label: 'Avg. Order Value',
      value: `$${averageOrderValue.toFixed(2)}`,
      icon: Package,
      color: 'bg-[#5156D2]',
      bgColor: 'bg-[#5156D2]/10'
    },
    {
      label: 'Active Products',
      value: activeProducts,
      icon: Users,
      color: 'bg-[#5156D2]',
      bgColor: 'bg-[#5156D2]/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">{metric.value}</p>
            </div>
            <div className={`${metric.bgColor} p-2 lg:p-3 rounded-lg`}>
              <metric.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${metric.color.replace('bg-', 'text-')}`} />
            </div>
          </div>
          <p className="text-xs lg:text-sm text-gray-500 mt-2">
            {metric.label === 'Total Orders' && 'All time orders'}
            {metric.label === 'Total Revenue' && 'Revenue in period'}
            {metric.label === 'Avg. Order Value' && 'Average per order'}
            {metric.label === 'Active Products' && 'Products sold'}
          </p>
        </div>
      ))}
    </div>
  )
}