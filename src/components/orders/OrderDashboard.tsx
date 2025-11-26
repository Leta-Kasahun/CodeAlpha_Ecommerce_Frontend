// src/components/orders/OrderDashboard.tsx
'use client';

import { useOrders } from '@/src/hooks/useOrders';
import { OrderStats } from './OrderStats';
import { OrderFilters } from './OrderFilters';
import { OrderList } from './OrderList';

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refetchOrders}
            className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OrderStats orders={orders} />
      <OrderFilters filters={filters} onFiltersChange={updateFilters} />
      <OrderList 
        orders={orders} 
        loading={loading}
        onStatusUpdate={updateOrderStatus}
      />
    </div>
  );
};