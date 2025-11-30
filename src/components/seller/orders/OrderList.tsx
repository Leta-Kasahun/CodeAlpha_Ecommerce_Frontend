// File: src/components/seller/SellerOrderList.tsx - WITH status updates
'use client'

import { Order } from '@/src/types'
import { SellerOrderCard } from './OrderCard'
import { Package, ShoppingCart } from 'lucide-react'

interface SellerOrderListProps {
  orders: Order[]
  loading: boolean
  onStatusUpdate: (orderId: string, newStatus: string) => Promise<void>
}

export const SellerOrderList = ({ orders, loading, onStatusUpdate }: SellerOrderListProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Package className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500 mb-6">No customer orders yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <SellerOrderCard
          key={order._id}
          order={order}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  )
}