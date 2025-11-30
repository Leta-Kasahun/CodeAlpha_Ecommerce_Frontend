// File: src/components/orders/OrderList.tsx - CLIENT VERSION
"use client";

import { Order } from '@/src/types';
import { OrderCard } from './OrderCard';
import { Package, ShoppingCart } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  // REMOVED: onStatusUpdate for clients
}

export const OrderList = ({ orders, loading }: OrderListProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Package className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          // REMOVED: onStatusUpdate prop
        />
      ))}
    </div>
  );
};