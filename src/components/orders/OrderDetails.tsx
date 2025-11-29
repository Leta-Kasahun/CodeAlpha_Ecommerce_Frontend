// src/components/orders/OrderDetails.tsx - FULL UPDATED VERSION
'use client';

import { useOrder } from '@/src/hooks/useOrder';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';
import { OrderShipping } from './OrderShipping';
import { OrderStatusTimeline } from './OrderStatusTimeLine';
import { OrderActions } from './OrderActions';
import { useRouter } from 'next/navigation';

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { order, loading, error, updateOrderStatus, refetchOrder } = useOrder(orderId);
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse space-y-6">
              {/* Header Skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              
              {/* Stats Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Content Skeleton */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
              <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => refetchOrder()}
                  className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => router.push('/dashboard/orders')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Orders
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order not found</h3>
              <p className="text-gray-500 mb-6">The order you're looking for doesn't exist or may have been removed.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push('/dashboard/orders')}
                  className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
                >
                  View All Orders
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <OrderHeader order={order} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items and Shipping */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItems order={order} />
            <OrderShipping order={order} />
          </div>

          {/* Right Column - Status Timeline and Actions */}
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
    </div>
  );
};