// File: src/app/seller/analytics/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { useSellerOrders } from '@/src/hooks/useSellerOrders'
import { AnalyticsHeader } from '@/src/components/seller/analytics/AnalyticsHeader'
import { MetricsGrid } from '@/src/components/seller/analytics/MetricsGrid'
import { RevenueChart } from '@/src/components/seller/analytics/RevenuChart'
import { OrderStatusChart } from '@/src/components/seller/analytics/OrderStatusChart'
import { TopProductsChart } from '@/src/components/seller/analytics/TopProductsChart'
import { AnalyticsStats } from '@/src/components/seller/analytics/AnalyticsStats'
import { TrendingUp } from 'lucide-react'

export default function SellerAnalytics() {
  const { orders, loading } = useSellerOrders()
  const [dateRange, setDateRange] = useState('30days')

  const analytics = useMemo(() => {
    if (!orders.length) return null

    const now = new Date()
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt)
      const diffTime = Math.abs(now.getTime() - orderDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      switch (dateRange) {
        case '7days': return diffDays <= 7
        case '30days': return diffDays <= 30
        case '90days': return diffDays <= 90
        case '1year': return diffDays <= 365
        default: return true
      }
    })

    // Revenue calculation
    const totalRevenue = filteredOrders.reduce((sum, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => 
        orderSum + (item.price * item.qty), 0
      )
      return sum + orderTotal
    }, 0)

    // Orders by status
    const statusData = [
      { name: 'Processing', value: filteredOrders.filter(o => o.orderStatus === 'processing').length, color: '#E6B84A' },
      { name: 'Shipped', value: filteredOrders.filter(o => o.orderStatus === 'shipped').length, color: '#5156D2' },
      { name: 'Completed', value: filteredOrders.filter(o => o.orderStatus === 'completed').length, color: '#5156D2' }
    ]

    // Revenue by month
    const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const month = date.toLocaleString('default', { month: 'short' })
      const year = date.getFullYear()
      
      const monthOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear()
      })
      
      const revenue = monthOrders.reduce((sum, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => 
          orderSum + (item.price * item.qty), 0
        )
        return sum + orderTotal
      }, 0)

      return { month: `${month} ${year}`, revenue }
    }).reverse()

    // Top products
    const productSales = filteredOrders.reduce((acc, order) => {
      order.orderItems.forEach(item => {
        const existing = acc.find(p => p.name === item.product.name)
        if (existing) {
          existing.sales += item.qty
          existing.revenue += item.price * item.qty
        } else {
          acc.push({
            name: item.product.name,
            sales: item.qty,
            revenue: item.price * item.qty
          })
        }
      })
      return acc
    }, [] as { name: string; sales: number; revenue: number }[])

    const topProducts = productSales
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    // Active products count
    const activeProducts = [...new Set(orders.flatMap(order => order.orderItems.map(item => item.product.name)))].length

    return {
      totalOrders: filteredOrders.length,
      totalRevenue,
      averageOrderValue: totalRevenue / filteredOrders.length,
      statusData,
      monthlyRevenue,
      topProducts,
      activeProducts
    }
  }, [orders, dateRange])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5156D2]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnalyticsHeader 
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {!analytics ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#5156D2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#5156D2]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data yet</h3>
            <p className="text-gray-600">Your analytics will appear here once you start receiving orders.</p>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            <MetricsGrid 
              totalOrders={analytics.totalOrders}
              totalRevenue={analytics.totalRevenue}
              averageOrderValue={analytics.averageOrderValue}
              activeProducts={analytics.activeProducts}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <RevenueChart data={analytics.monthlyRevenue} />
              <OrderStatusChart data={analytics.statusData} />
            </div>

            <TopProductsChart data={analytics.topProducts} />

            <AnalyticsStats 
              topProducts={analytics.topProducts}
              statusData={analytics.statusData}
              totalOrders={analytics.totalOrders}
              dateRange={dateRange}
              totalRevenue={analytics.totalRevenue}
            />
          </div>
        )}
      </div>
    </div>
  )
}