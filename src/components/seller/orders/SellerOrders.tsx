// File: src/components/seller/orders/SellerOrders.tsx
'use client'

import { useSellerOrders } from '@/src/hooks/useSellerOrders'
import { SellerOrderStats } from './SellerOrderStatus'
import { SellerOrderFilters } from './SellerOrderFilters'
import { SellerOrdersTable } from './SellerOrderTable'
import { useState, useMemo } from 'react'
import { ShoppingCart, RefreshCw, Receipt } from 'lucide-react'

export function SellerOrders() {
  const {
    orders,
    loading,
    pagination,
    updateOrderStatus,
    deleteOrder,
    refetch
  } = useSellerOrders()

  const [refreshing, setRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 10
  })

  const filteredOrders = useMemo(() => {
    if (!filters.status) return orders
    return orders.filter(order => order.orderStatus === filters.status)
  }, [orders, filters.status])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  const handleExport = () => {
    // Export functionality - can be CSV, PDF, etc.
    const exportData = filteredOrders.map(order => ({
      'Order ID': order._id,
      'Product': order.orderItems[0]?.product.name,
      'Quantity': order.orderItems[0]?.qty,
      'Price': `$${order.orderItems[0]?.price}`,
      'Status': order.orderStatus,
      'Customer': order.user.name,
      'Email': order.user.email,
      'Order Date': new Date(order.createdAt).toLocaleDateString()
    }))

    // Simple CSV export
    const headers = Object.keys(exportData[0] || {}).join(',')
    const csvData = exportData.map(row => Object.values(row).join(',')).join('\n')
    const csvContent = `${headers}\n${csvData}`
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `seller-orders-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleUpdateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#5156D2] p-2 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Seller Orders</h2>
            <p className="text-gray-600 text-sm mt-1">Manage orders for your products</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={filteredOrders.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Receipt className="w-4 h-4" />
            Export CSV
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
      
      {/* Seller Order Statistics */}
      <SellerOrderStats orders={filteredOrders} />

      {/* Seller Filters */}
      <SellerOrderFilters 
        filters={filters} 
        onFiltersChange={handleUpdateFilters} 
      />

      {/* Orders Table */}
      <SellerOrdersTable 
        orders={filteredOrders} 
        loading={loading}
        onStatusUpdate={async (orderId, status) => {
          await updateOrderStatus(orderId, status)
        }}
        onDeleteOrder={async (orderId) => {
          await deleteOrder(orderId)
        }}
        pagination={pagination}
        onPageChange={(page) => handleUpdateFilters({ page })}
      />
    </div>
  )
}