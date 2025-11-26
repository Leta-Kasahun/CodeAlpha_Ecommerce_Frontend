// src/app/dashboard/page.tsx

import { DashboardStats } from '@/src/components/dashboard/DashboardStats'
import { FashionRecommendations } from '@/src/components/dashboard/FashionRecommendations'
import { RecentOrders } from '@/src/components/dashboard/RecentOrders'
import { ReviewSection } from '@/src/components/dashboard/ReviewSection'
import { ReviewStats } from '@/src/components/dashboard/ReviewStats'
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome to your ShopSphere fashion dashboard</p>
        </div>
        
      </div>
      
      <DashboardStats />
      <ReviewStats />
      <FashionRecommendations />
      <RecentOrders />
      <ReviewSection />
    </div>
  )
}