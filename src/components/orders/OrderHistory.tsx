// File: src/components/orders/OrderHistory.tsx - Remove ID display, horizontal filters above history
'use client';

import { Order } from '@/src/types';
import { useState, useMemo } from 'react';
import { Search, Calendar, Download } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
  filters: {
    status: string;
    paymentStatus: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const OrderHistory = ({ orders, filters, onFiltersChange }: OrderHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesDate = (!dateRange.start || new Date(order.createdAt) >= new Date(dateRange.start)) &&
                         (!dateRange.end || new Date(order.createdAt) <= new Date(dateRange.end));

      const matchesStatus = !filters.status || order.orderStatus === filters.status;
      const matchesPayment = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;

      return matchesDate && matchesStatus && matchesPayment;
    });
  }, [orders, dateRange, filters]);

  const totalSpent = useMemo(() => 
    filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0), 
    [filteredOrders]
  );

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Calendar className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No order history</h3>
        <p className="text-gray-500">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Horizontal Filters - Compact - ABOVE HISTORY ONLY */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Date Range */}
          <div className="flex gap-2 flex-1">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm flex-1"
              placeholder="Start date"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm flex-1"
              placeholder="End date"
            />
          </div>
        </div>
      </div>

      {/* Orders List - Full Width - NO ORDER ID DISPLAY */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : order.orderStatus === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Items:</span> {order.orderItems.length}
                  </div>
                  <div>
                    <span className="font-medium">Total:</span> ${order.totalPrice}
                  </div>
                </div>

                {/* Order Items Preview - NO ORDER ID */}
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    {order.orderItems.map(item => 
                      typeof item.product !== 'string' ? item.product.name : 'Product'
                    ).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`/dashboard/orders/${order._id}`, '_blank')}
                  className="px-4 py-2 text-sm bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
                >
                  View Details
                </button>
                <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Calendar className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">Try adjusting your date range or filters.</p>
        </div>
      )}
    </div>
  );
};