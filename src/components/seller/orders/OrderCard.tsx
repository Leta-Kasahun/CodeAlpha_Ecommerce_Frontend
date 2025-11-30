// File: src/components/seller/SellerOrderCard.tsx - WITH OrderActions for sellers
'use client'

import { useState } from 'react'
import { Order } from '@/src/types'
import { OrderStatusBadge } from '../../orders/OrderStatusBadge'
import { PaymentStatusBadge } from '../../orders/PaymentStatusBadge'
import { OrderActions } from '../../orders/OrderActions'

interface SellerOrderCardProps {
  order: Order
  onStatusUpdate: (orderId: string, newStatus: string) => Promise<void>
}

export const SellerOrderCard = ({ order, onStatusUpdate }: SellerOrderCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      setIsUpdating(true)
      await onStatusUpdate(order._id, newStatus)
    } catch (error) {
      console.error('Failed to update order status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Order Info - Same as client but WITH actions */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Order #{order._id.slice(-8)}
            </h3>
            <OrderStatusBadge status={order.orderStatus} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Items:</span> {order.orderItems.length}
            </div>
            <div>
              <span className="font-medium">Total:</span> ${order.totalPrice}
            </div>
            <div>
              <span className="font-medium">Payment:</span> {order.paymentMethod}
            </div>
            <div>
              <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
            </div>
          </div>

          {order.shippingAddress && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">Shipping to:</span>{' '}
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </div>
          )}
        </div>

        {/* OrderActions - ONLY for sellers */}
        <OrderActions
          currentStatus={order.orderStatus}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  )
}