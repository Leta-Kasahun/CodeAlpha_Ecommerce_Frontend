// File: src/components/orders/OrderDashboard.tsx - Horizontal filters, no order ID
'use client';

import { useOrders } from '@/src/hooks/useOrders';
import { OrderStats } from './OrderStats';
import { OrderList } from './OrderList';
import { OrderHistory } from './OrderHistory';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Package, RefreshCw, History, Grid, Filter } from 'lucide-react';

type ViewMode = 'list' | 'history';

export const OrderDashboard = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [refreshing, setRefreshing] = useState(false);
  
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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchOrders();
    } finally {
      setRefreshing(false);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!filters.status && !filters.paymentStatus) return orders;

    return orders.filter(order => {
      const statusMatch = !filters.status || order.orderStatus === filters.status;
      const paymentMatch = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;
      return statusMatch && paymentMatch;
    });
  }, [orders, filters]);

  // Horizontal Filter Component
  const HorizontalFilters = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={filters.status}
            onChange={(e) => updateFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm"
          >
            <option value="">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) => updateFilters({ ...filters, paymentStatus: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm"
          >
            <option value="">All Payments</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>

          {(filters.status || filters.paymentStatus) && (
            <button
              onClick={() => updateFilters({ status: '', paymentStatus: '' })}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#5156D2] p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-600">
                {viewMode === 'list' ? 'Manage your orders' : 'View order analytics'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#5156D2] text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
                Orders
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'history' 
                    ? 'bg-[#5156D2] text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <History className="w-4 h-4" />
                Analytics
              </button>
            </div>

            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <OrderStats orders={filteredOrders} />

        {/* Horizontal Filters */}
        <HorizontalFilters />

        {/* Main Content */}
        <div>
          {viewMode === 'list' ? (
            <OrderList 
              orders={filteredOrders} 
              loading={false}
              onStatusUpdate={updateOrderStatus}
            />
          ) : (
            <OrderHistory 
              orders={filteredOrders}
              filters={filters}
              onFiltersChange={updateFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};