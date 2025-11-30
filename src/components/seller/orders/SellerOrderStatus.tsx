// src/components/seller/orders/SellerOrderStats.tsx
"use client";

import { SellerOrder } from '@/src/types/seller';

interface SellerOrderStatsProps {
  orders: SellerOrder[];
}

export const SellerOrderStats = ({ orders }: SellerOrderStatsProps) => {
  // Calculate total revenue from order items (price × quantity)
  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + (item.price * item.qty);
    }, 0);
    return sum + orderTotal;
  }, 0);

  const stats = {
    total: orders.length,
    processing: orders.filter(order => order.orderStatus === 'processing').length,
    shipped: orders.filter(order => order.orderStatus === 'shipped').length,
    completed: orders.filter(order => order.orderStatus === 'completed').length,
    totalRevenue: totalRevenue,
  };

  const statCards = [
    {
      label: 'Total Orders',
      value: stats.total,
      color: 'bg-[#5156D2]',
      textColor: 'text-[#5156D2]',
    },
    {
      label: 'Processing',
      value: stats.processing,
      color: 'bg-[#E6B84A]',
      textColor: 'text-[#E6B84A]',
    },
    {
      label: 'Shipped',
      value: stats.shipped,
      color: 'bg-[#5156D2]',
      textColor: 'text-[#5156D2]',
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'bg-[#5156D2]',
      textColor: 'text-[#5156D2]',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      color: 'bg-[#E6B84A]',
      textColor: 'text-[#E6B84A]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center gap-3">
            <div className={`${stat.color} w-4 h-4 rounded-full flex-shrink-0`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};