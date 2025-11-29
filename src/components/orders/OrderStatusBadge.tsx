// src/components/orders/OrderStatusBadge.tsx - UPDATED
"use client";

import { Order } from '@/src/types';

interface OrderStatusBadgeProps {
  status: Order['orderStatus'];
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    processing: {
      label: 'Processing',
      color: 'bg-[#E6B84A] text-white', // Secondary color
    },
    shipped: {
      label: 'Shipped', 
      color: 'bg-[#5156D2] text-white', // Primary color
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-500 text-white',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};