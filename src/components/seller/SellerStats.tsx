// File: src/components/seller/SellerStats.tsx
'use client'

import { useSellerProducts } from '@/src/hooks/useSellerProducts'
import { useSellerOrders } from '@/src/hooks/useSellerOrders'
import { Package, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react'
import { useMemo } from 'react'

export function SellerStats() {
  const { products, loading: productsLoading } = useSellerProducts()
  const { orders, loading: ordersLoading } = useSellerOrders()

  const statsData = useMemo(() => {
    if (productsLoading || ordersLoading) return null

    // Calculate total revenue from order items (same as in Analytics)
    const totalRevenue = orders.reduce((sum, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + (item.price * item.qty)
      }, 0)
      return sum + orderTotal
    }, 0)

    // Calculate growth rate based on order count
    const currentPeriodOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return orderDate >= thirtyDaysAgo
    }).length

    const previousPeriodOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      const sixtyDaysAgo = new Date()
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return orderDate >= sixtyDaysAgo && orderDate < thirtyDaysAgo
    }).length

    const growthRate = previousPeriodOrders > 0 
      ? ((currentPeriodOrders - previousPeriodOrders) / previousPeriodOrders * 100).toFixed(1)
      : currentPeriodOrders > 0 ? '100.0' : '0.0'

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      growthRate: `${growthRate}%`
    }
  }, [products, orders, productsLoading, ordersLoading])

  const stats = [
    { 
      name: 'Total Products', 
      value: statsData?.totalProducts.toString() || '0', 
      icon: Package, 
      change: '+12%',
      color: 'bg-[#5156D2]',
      bgColor: 'bg-[#5156D2]/10',
      textColor: 'text-[#5156D2]'
    },
    { 
      name: 'Total Orders', 
      value: statsData?.totalOrders.toString() || '0', 
      icon: ShoppingCart, 
      change: '+8%',
      color: 'bg-[#5156D2]',
      bgColor: 'bg-[#5156D2]/10',
      textColor: 'text-[#5156D2]'
    },
    { 
      name: 'Revenue', 
      value: `$${statsData?.totalRevenue.toFixed(2) || '0.00'}`, 
      icon: DollarSign, 
      change: '+23%',
      color: 'bg-[#E6B84A]',
      bgColor: 'bg-[#E6B84A]/10',
      textColor: 'text-[#E6B84A]'
    },
    { 
      name: 'Growth Rate', 
      value: statsData?.growthRate || '0%', 
      icon: TrendingUp, 
      change: '+5%',
      color: 'bg-[#E6B84A]',
      bgColor: 'bg-[#E6B84A]/10',
      textColor: 'text-[#E6B84A]'
    }
  ]

  if (productsLoading || ordersLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 truncate">{stat.name}</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1 truncate">
                {stat.value}
              </p>
              <p className={`text-xs lg:text-sm ${stat.textColor} font-medium mt-1`}>
                {stat.change}
              </p>
            </div>
            <div className={`p-2 lg:p-3 ${stat.bgColor} rounded-lg flex-shrink-0 ml-3`}>
              <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}