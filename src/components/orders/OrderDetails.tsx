// src/components/orders/OrderDetails.tsx
'use client';

import { useOrder } from '@/src/hooks/useOrder';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';
import { OrderShipping } from './OrderShipping';
import { OrderStatusTimeline } from './OrderStatusTimeline';
import { OrderActions } from './OrderActions';

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { order, loading, error, updateOrderStatus, refetchOrder } = useOrder(orderId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
          <button 
            onClick={refetchOrder}
            className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order not found</h3>
          <p className="text-gray-500">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <OrderHeader order={order} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItems order={order} />
          <OrderShipping order={order} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OrderStatusTimeline 
            order={order} 
            onStatusUpdate={updateOrderStatus}
          />
          <OrderActions 
            currentStatus={order.orderStatus}
            onStatusUpdate={updateOrderStatus}
          />
        </div>
      </div>
    </div>
  );
};