// OrderActions: control to advance order status. Accept optional parent isUpdating to avoid prop type mismatch and UI race conditions.
'use client';

import { useState } from 'react';
import { Order } from '@/src/types';

interface OrderActionsProps {
  currentStatus: Order['orderStatus'];
  onStatusUpdate: (status: string) => Promise<void>;
  isUpdating?: boolean; // optional controlled flag from parent
}

export const OrderActions = ({ currentStatus, onStatusUpdate, isUpdating: parentUpdating }: OrderActionsProps) => {
  const [internalUpdating, setInternalUpdating] = useState(false);
  const isUpdating = typeof parentUpdating === 'boolean' ? parentUpdating : internalUpdating;

  const getNextStatus = (current: Order['orderStatus']) => {
    const statusFlow: Record<string, { next: string; label: string; color: string } | null> = {
      processing: { next: 'shipped', label: 'Mark as Shipped', color: 'bg-[#5156D2] hover:bg-[#4347c4]' },
      shipped: { next: 'completed', label: 'Mark as Completed', color: 'bg-green-600 hover:bg-green-700' },
      completed: null,
    };
    return statusFlow[current] ?? null;
  };

  const handleStatusUpdate = async () => {
    const nextStatusInfo = getNextStatus(currentStatus);
    if (!nextStatusInfo) return;

    try {
      if (typeof parentUpdating !== 'boolean') setInternalUpdating(true);
      await onStatusUpdate(nextStatusInfo.next);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      if (typeof parentUpdating !== 'boolean') setInternalUpdating(false);
    }
  };

  const nextStatusInfo = getNextStatus(currentStatus);

  if (!nextStatusInfo) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
        <div className="text-center py-4">
          <p className="text-gray-600">No actions available</p>
          <p className="text-sm text-gray-500 mt-1">This order has been completed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
      
      <div className="space-y-3">
        <button
          onClick={handleStatusUpdate}
          disabled={isUpdating}
          className={`w-full px-4 py-3 text-white rounded-lg transition-colors font-medium ${nextStatusInfo.color} ${
            isUpdating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUpdating ? 'Updating...' : nextStatusInfo.label}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Print Invoice
          </button>
          <button className="px-3 py-2 text-sm border border-[#E6B84A] text-[#E6B84A] rounded-lg hover:bg-yellow-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};