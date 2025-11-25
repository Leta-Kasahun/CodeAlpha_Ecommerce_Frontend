// src/components/dashboard/RecentOrders.tsx
// Recent orders list showing order status and fashion items

'use client'

import { Clock, CheckCircle, Truck, Package, CreditCard, MapPin } from 'lucide-react'

const orders = [
  { id: 'SP123', product: 'Designer Handbag', status: 'processing', date: '2024-01-15', amount: 249, items: 1, payment: 'card' },
  { id: 'SP122', product: 'Summer Dress', status: 'shipped', date: '2024-01-14', amount: 89, items: 2, payment: 'upi' },
  { id: 'SP121', product: 'Sneakers', status: 'completed', date: '2024-01-12', amount: 120, items: 1, payment: 'wallet' },
]

const statusIcons = {
  processing: Clock,
  shipped: Truck,
  completed: CheckCircle,
}

const statusColors = {
  processing: 'text-yellow-600 bg-yellow-50',
  shipped: 'text-blue-600 bg-blue-50',
  completed: 'text-green-600 bg-green-50',
}

const paymentIcons = {
  card: CreditCard,
  upi: CreditCard,
  wallet: CreditCard,
  cash: CreditCard,
}

export function RecentOrders() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <p className="text-gray-600 text-sm mt-1">Your latest fashion purchases</p>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => {
          const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
          const PaymentIcon = paymentIcons[order.payment as keyof typeof paymentIcons]
          return (
            <div key={order.id} className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${statusColors[order.status as keyof typeof statusColors]}`}>
                  <StatusIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.product}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-sm text-gray-500">#{order.id}</p>
                    <div className="flex items-center space-x-1">
                      <Package className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <PaymentIcon className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-500 capitalize">{order.payment}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">${order.amount}</p>
                <p className="text-sm text-gray-500 capitalize flex items-center justify-end">
                  <MapPin className="h-3 w-3 mr-1" />
                  {order.status}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}