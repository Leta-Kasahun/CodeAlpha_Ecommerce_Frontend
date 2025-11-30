// File: src/components/seller/SellerOrders.tsx - COMPLETE seller orders management
'use client'

import { useOrders } from '@/src/hooks/useOrders'
import { OrderStats } from '@/src/components/orders/OrderStats'
import { OrderFilters } from '@/src/components/orders/OrderFilters'
import { SellerOrderList } from './OrderList'
import { useState, useMemo } from 'react'
import { Package, Download, RefreshCw } from 'lucide-react'

export function SellerOrders() {
  const {
    orders,
    loading,
    error,
    filters,
    updateOrderStatus,
    refetchOrders,
    updateFilters
  } = useOrders()

  const [refreshing, setRefreshing] = useState(false)

  const filteredOrders = useMemo(() => {
    if (!filters.status && !filters.paymentStatus) return orders
    return orders.filter(order => {
      const statusMatch = !filters.status || order.orderStatus === filters.status
      const paymentMatch = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus
      return statusMatch && paymentMatch
    })
  }, [orders, filters])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetchOrders()
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#5156D2] p-2 rounded-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
            <p className="text-gray-600 text-sm mt-1">Manage and update customer orders</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Order Statistics */}
      <OrderStats orders={filteredOrders} />

      {/* Filters */}
      <OrderFilters 
        filters={filters} 
        onFiltersChange={updateFilters} 
      />

      {/* Seller Order List WITH status updates */}
      <SellerOrderList 
        orders={filteredOrders} 
        loading={loading}
        onStatusUpdate={updateOrderStatus}
      />
    </div>
  )
}