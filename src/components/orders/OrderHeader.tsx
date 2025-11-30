// src/components/orders/OrderHeader.tsx
"use client";
import { Order } from '@/src/types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { Calendar, Package, CreditCard, FileText } from 'lucide-react';

interface OrderHeaderProps {
  order: Order;
}

export const OrderHeader = ({ order }: OrderHeaderProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Placed on {formatDate(order.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <OrderStatusBadge status={order.orderStatus} />
          <PaymentStatusBadge status={order.paymentStatus} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <FileText className="w-4 h-4 text-[#5156D2]" />
          <div>
            <p className="font-medium text-gray-700">Total Amount</p>
            <p className="text-lg font-semibold text-[#5156D2]">${order.totalPrice}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <CreditCard className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-700">Payment Method</p>
            <p className="text-gray-900 capitalize">{order.paymentMethod}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Package className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-700">Items</p>
            <p className="text-gray-900">{order.orderItems.length} items</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Calendar className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-700">Order Date</p>
            <p className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};