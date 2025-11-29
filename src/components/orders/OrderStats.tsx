// src/components/orders/OrderStats.tsx
"use client";

import { Order } from '@/src/types';

interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats = ({ orders }: OrderStatsProps) => {
  const stats = {
    total: orders.length,
    processing: orders.filter(order => order.orderStatus === 'processing').length,
    shipped: orders.filter(order => order.orderStatus === 'shipped').length,
    completed: orders.filter(order => order.orderStatus === 'completed').length,
  };

  const statCards = [
    {
      label: 'Total Orders',
      value: stats.total,
      color: 'bg-[#5156D2]',
    },
    {
      label: 'Processing',
      value: stats.processing,
      color: 'bg-[#E6B84A]',
    },
    {
      label: 'Shipped',
      value: stats.shipped,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center">
            <div className={`${stat.color} w-4 h-4 rounded-full mr-3`} />
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};