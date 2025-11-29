// src/components/orders/OrderDashboard.tsx - UPDATED
'use client';

import { useOrders } from '@/src/hooks/useOrders';
import { OrderStats } from './OrderStats';
import { OrderFilters } from './OrderFilters';
import { OrderList } from './OrderList';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const OrderDashboard = () => {
  const {
    orders,
    loading,
    error,
    filters,
    updateOrderStatus,
    refetchOrders,
    updateFilters
  } = useOrders();

  const router = useRouter();

  useEffect(() => {
    if (error?.includes('Authentication') || error?.includes('token')) {
      router.push('/login');
    }
  }, [error, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !error.includes('Authentication')) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load orders</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={refetchOrders}
              className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <button 
            onClick={refetchOrders}
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Refresh
          </button>
        </div>
        
        <OrderStats orders={orders} />
        <OrderFilters filters={filters} onFiltersChange={updateFilters} />
        <OrderList 
          orders={orders} 
          loading={false} // Already handled above
          onStatusUpdate={updateOrderStatus}
        />
      </div>
    </div>
  );
};