// src/app/dashboard/seller/page.tsx
// Seller dashboard with all functionality moved from components

'use client'

import { SellerStats } from '@/src/components/seller/SellerStats'
import { QuickActions } from '@/src/components/seller/QuickActions'
import { RecentProducts } from '@/src/components/seller/RecentProducts'
import { PerformanceChart } from '@/src/components/seller/PerformanceChart'

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your fashion business on ShopSphere</p>
      </div>
      
      {/* Stats Grid */}
      <SellerStats />
      
      {/* Quick Actions */}
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <RecentProducts />
        
        {/* Performance Chart */}
        <PerformanceChart />
      </div>
    </div>
  )
}