// File: src/components/seller/PerformanceChart.tsx
'use client'

import { useSellerOrders } from '@/src/hooks/useSellerOrders'
import { useMemo } from 'react'

export function PerformanceChart() {
  const { orders, loading } = useSellerOrders()

  const performanceData = useMemo(() => {
    if (!orders.length) return []

    // Get last 6 months data
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthName = date.toLocaleString('default', { month: 'short' })
      
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear()
      })
      
      const revenue = monthOrders.reduce((sum, order) => {
        return sum + order.orderItems.reduce((orderSum, item) => 
          orderSum + (item.price * item.qty), 0
        )
      }, 0)

      const ordersCount = monthOrders.length

      return {
        month: monthName,
        revenue,
        orders: ordersCount
      }
    }).reverse()
  }, [orders])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5156D2]"></div>
        </div>
      </div>
    )
  }

  if (!performanceData.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#5156D2] to-[#E6B84A] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">📈</span>
            </div>
            <p className="text-gray-600">No sales data available</p>
            <p className="text-sm text-gray-500 mt-1">Start selling to see performance metrics</p>
          </div>
        </div>
      </div>
    )
  }

  const maxRevenue = Math.max(...performanceData.map(item => item.revenue))
  const maxOrders = Math.max(...performanceData.map(item => item.orders))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sales Performance</h2>
          <p className="text-gray-600 text-sm">Last 6 months overview</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#5156D2]">
            ${performanceData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
          </p>
          <p className="text-gray-600 text-sm">Total Revenue</p>
        </div>
      </div>

      <div className="space-y-4">
        {performanceData.map((item, index) => {
          const revenuePercentage = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0
          const ordersPercentage = maxOrders > 0 ? (item.orders / maxOrders) * 100 : 0

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600">{item.month}</div>
              
              <div className="flex-1 space-y-2">
                {/* Revenue Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs text-gray-500">Revenue</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#5156D2] to-[#5156D2]/80 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${revenuePercentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-medium text-[#5156D2]">
                    ${item.revenue.toFixed(2)}
                  </div>
                </div>

                {/* Orders Bar */}
                <div className="flex items-center gap-3">
                  <div className="w-16 text-xs text-gray-500">Orders</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#E6B84A] to-[#E6B84A]/80 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${ordersPercentage}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-medium text-[#E6B84A]">
                    {item.orders}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#5156D2] rounded"></div>
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#E6B84A] rounded"></div>
          <span className="text-sm text-gray-600">Orders</span>
        </div>
      </div>
    </div>
  )
}