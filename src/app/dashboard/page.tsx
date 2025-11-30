// File: src/app/dashboard/page.tsx - KEEP ALL YOUR COMPONENTS
'use client'

import { useOrders } from '@/src/hooks/useOrders'
import { OrderStats } from '@/src/components/orders/OrderStats'
import { FashionRecommendations } from '@/src/components/dashboard/FashionRecommendations'
import { RecentOrders } from '@/src/components/dashboard/RecentOrders'
import { ReviewSection } from '@/src/components/dashboard/ReviewSection'

export default function DashboardPage() {
  const { orders, loading, error } = useOrders()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">Welcome to your ShopSphere dashboard</p>
          </div>
        </div>
        
        {/* REAL ORDER STATS */}
        <OrderStats orders={orders} />
        
        {/* KEEP ALL YOUR EXISTING COMPONENTS */}
        <FashionRecommendations />
        <RecentOrders orders={orders} />
        <ReviewSection />
      </div>
    </div>
  )
}