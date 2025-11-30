// File: src/components/dashboard/RecentOrders.tsx - WITH PRODUCT IMAGES
'use client'

import { Clock, CheckCircle, Truck, Calendar, ArrowRight } from 'lucide-react'
import { Order } from '@/src/types'
import { OrderStatusBadge } from '../orders/OrderStatusBadge'

interface RecentOrdersProps {
  orders?: Order[]
}

const statusIcons = {
  processing: Clock,
  shipped: Truck,
  completed: CheckCircle,
}

export function RecentOrders({ orders = [] }: RecentOrdersProps) {
  // Get last 3 orders sorted by date (most recent first)
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (recentOrders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <p className="text-gray-600 text-sm mt-1">Your latest orders will appear here</p>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No orders yet</p>
          <p className="text-gray-400 text-xs mt-1">Complete your first purchase to see orders here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <p className="text-gray-600 text-sm mt-1">Your latest purchases</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentOrders.map((order) => {
          const StatusIcon = statusIcons[order.orderStatus]
          const firstItem = order.orderItems[0]
          const product = typeof firstItem?.product !== 'string' ? firstItem?.product : null
          
          return (
            <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {product?.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <div className="text-gray-400 text-xs text-center px-2">
                          No Image
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <OrderStatusBadge status={order.orderStatus} />
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Product Name and Price */}
                    {product && (
                      <div className="mb-2">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${firstItem.price} × {firstItem.qty}
                        </p>
                      </div>
                    )}

                    {/* Additional Items Count */}
                    {order.orderItems.length > 1 && (
                      <p className="text-xs text-gray-500">
                        +{order.orderItems.length - 1} more item{order.orderItems.length - 1 > 1 ? 's' : ''}
                      </p>
                    )}

                    {/* Order Total */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#5156D2]">
                        ${order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* View Details Arrow */}
                <button 
                  onClick={() => window.open(`/dashboard/orders/${order._id}`, '_blank')}
                  className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-[#5156D2] transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}