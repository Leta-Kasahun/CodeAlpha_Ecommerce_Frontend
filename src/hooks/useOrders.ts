// useOrders: fetch and manage orders. Handles backend envelope and protects against undefined payloads.
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ordersAPI } from '@/src/lib/api/orders';
import { Order } from '@/src/types';
import { useAuthStore } from '@/src/stores';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  filters: OrderFilters;
  updateOrderStatus: (orderId: string, newStatus: string) => Promise<void>;
  refetchOrders: () => Promise<void>;
  updateFilters: (newFilters: Partial<OrderFilters>) => void;
}

interface OrderFilters {
  status: string;
  paymentStatus: string;
}

export const useOrders = (): UseOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrderFilters>({
    status: '',
    paymentStatus: '',
  });
  
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuthStore();

  const handleAuthError = () => {
    logout();
    router.push('/login');
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated || !token) {
        handleAuthError();
        return;
      }

      const response = await ordersAPI.getOrders(token);
      
      if (response && response.success) {
        setOrders(response.orders ?? []);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid token') || err.message?.includes('Authentication')) {
        handleAuthError();
      } else {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      if (!isAuthenticated || !token) {
        handleAuthError();
        return;
      }

      const response = await ordersAPI.updateOrderStatus(orderId, newStatus, token);
      
      if (response && response.success) {
        // If backend returns updated order object, use it. Otherwise do a safe local update.
        if ((response as any).order) {
          const updatedOrder = (response as any).order as Order;
          setOrders(prev => prev.map(o => (o._id === orderId ? updatedOrder : o)));
        } else {
          setOrders(prev => prev.map(order => 
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          ));
        }
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid token') || err.message?.includes('Authentication')) {
        handleAuthError();
      } else {
        console.error('Error updating order status:', err);
        throw err;
      }
    }
  };

  const updateFilters = (newFilters: Partial<OrderFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOrders();
    } else {
      handleAuthError();
    }
  }, [isAuthenticated, token]);

  return {
    orders,
    loading,
    error,
    filters,
    updateOrderStatus,
    refetchOrders: fetchOrders,
    updateFilters,
  };
};