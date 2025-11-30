// File: src/components/orders/OrderDetails.tsx - USER VIEW ONLY
'use client';

import { useOrder } from '@/src/hooks/useOrder';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';
import { OrderShipping } from './OrderShipping';
import { OrderStatusTimeline } from './OrderStatusTimeLine';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface OrderDetailsProps {
  orderId: string;
}

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const router = useRouter();
  const { order, loading, error, refetchOrder } = useOrder(orderId);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Invalid Order</h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push('/dashboard/orders')}
                className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4]"
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-48"></div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Order not found</h3>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => refetchOrder()}
                className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4]"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/dashboard/orders')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>

        <OrderHeader order={order} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderItems order={order} />
            <OrderShipping order={order} />
          </div>
          <div className="space-y-6">
            {/* REMOVED: OrderActions - Users cannot update status */}
            <OrderStatusTimeline 
              order={order} 
              onStatusUpdate={() => {}} // Empty function for users
            />
          </div>
        </div>
      </div>
    </div>
  );
};