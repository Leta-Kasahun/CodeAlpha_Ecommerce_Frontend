// File: src/components/seller/orders/SellerOrdersTable.tsx
'use client'

import { SellerOrder } from '@/src/types/seller'
import { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'

interface SellerOrdersTableProps {
  orders: SellerOrder[]
  loading: boolean
  onStatusUpdate: (orderId: string, status: string) => Promise<void>
  onDeleteOrder: (orderId: string) => Promise<void>
  pagination: {
    total: number
    page: number
    pages: number
    limit: number
  }
  onPageChange: (page: number) => void
}

export function SellerOrdersTable({ 
  orders, 
  loading, 
  onStatusUpdate, 
  onDeleteOrder,
  pagination,
  onPageChange 
}: SellerOrdersTableProps) {
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null)
  const [deletingOrder, setDeletingOrder] = useState<string | null>(null)
  const [editingOrder, setEditingOrder] = useState<string | null>(null)

  const handleStatusUpdate = async (orderId: string, status: string) => {
    setUpdatingOrder(orderId)
    try {
      await onStatusUpdate(orderId, status)
      setEditingOrder(null)
    } finally {
      setUpdatingOrder(null)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    setDeletingOrder(orderId)
    try {
      await onDeleteOrder(orderId)
    } finally {
      setDeletingOrder(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-[#E6B84A] text-white'
      case 'shipped': return 'bg-[#5156D2] text-white'
      case 'completed': return 'bg-[#5156D2] text-white'
      default: return 'bg-[#5156D2] text-white'
    }
  }

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = ['processing', 'shipped', 'completed']
    return allStatuses.filter(status => status !== currentStatus)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5156D2]"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="w-12 h-12 bg-[#5156D2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-6 h-6 bg-[#5156D2] rounded-full"></div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-600">Orders for your products will appear here.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Product</th>
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Quantity</th>
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Price</th>
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Status</th>
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Customer</th>
              <th className="text-left py-4 px-6 text-base font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => {
              const mainItem = order.orderItems[0]
              const isUpdating = updatingOrder === order._id
              const isDeleting = deletingOrder === order._id
              const isEditing = editingOrder === order._id

              return (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  {/* Product Column */}
                  <td className="py-4 px-6">
                    <div className="max-w-xs">
                      <p className="text-base font-medium text-gray-900 line-clamp-2">
                        {mainItem?.product.name}
                      </p>
                    </div>
                  </td>

                  {/* Quantity Column */}
                  <td className="py-4 px-6">
                    <span className="text-base text-gray-900 font-medium">
                      {mainItem?.qty}
                    </span>
                  </td>

                  {/* Price Column */}
                  <td className="py-4 px-6">
                    <span className="text-base font-medium text-[#5156D2]">
                      ${mainItem?.price}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="py-4 px-6">
                    {isEditing ? (
                      <select 
                        className="border border-gray-300 rounded px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-[#5156D2]"
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        disabled={isUpdating}
                      >
                        {getStatusOptions(order.orderStatus).map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    )}
                  </td>

                  {/* Customer Column */}
                  <td className="py-4 px-6">
                    <div className="max-w-xs">
                      <p className="text-base font-medium text-gray-900 truncate">{order.user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{order.user.email}</p>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {/* Status Action Button */}
                      {!isEditing && order.orderStatus !== 'completed' && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, 
                            order.orderStatus === 'processing' ? 'shipped' : 'completed'
                          )}
                          disabled={isUpdating}
                          className={`px-4 py-2 text-white rounded text-sm font-medium transition-colors ${
                            order.orderStatus === 'processing' 
                              ? 'bg-[#E6B84A] hover:bg-[#d4a53e]' 
                              : 'bg-[#5156D2] hover:bg-[#4347c4]'
                          } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {isUpdating ? '...' : 
                           order.orderStatus === 'processing' ? 'Ship Order' : 'Complete Order'}
                        </button>
                      )}

                      {/* Action Icons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          disabled={isDeleting}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingOrder(isEditing ? null : order._id)}
                          className="p-1.5 text-gray-600 hover:text-[#5156D2] hover:bg-[#5156D2]/10 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="border-t border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex justify-center items-center gap-1 lg:gap-2 flex-wrap">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  page === pagination.page
                    ? 'bg-[#5156D2] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}