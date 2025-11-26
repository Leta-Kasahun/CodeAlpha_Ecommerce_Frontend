// src/hooks/useOrder.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ordersAPI } from '@/src/lib/api/orders';
import { Order } from '@/src/types';
import { useAuthStore } from '@/src/stores';

interface UseOrderReturn {
  order: Order | null;
  loading: boolean;
  error: string | null;
  updateOrderStatus: (newStatus: string) => Promise<void>;
  refetchOrder: () => Promise<void>;
}

export const useOrder = (orderId: string): UseOrderReturn => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuthStore();

  const handleAuthError = () => {
    logout();
    router.push('/login');
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated || !token) {
        handleAuthError();
        return;
      }

      const response = await ordersAPI.getOrder(orderId, token);
      
      if (response.success) {
        setOrder(response.order);
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid token') || err.message?.includes('Authentication')) {
        handleAuthError();
      } else if (err.message?.includes('Order not found')) {
        setError('Order not found');
      } else {
        setError('Failed to fetch order details');
        console.error('Error fetching order:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    try {
      if (!isAuthenticated || !token) {
        handleAuthError();
        return;
      }

      const response = await ordersAPI.updateOrderStatus(orderId, newStatus, token);
      
      if (response.success) {
        setOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
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

  useEffect(() => {
    if (isAuthenticated && token && orderId) {
      fetchOrder();
    } else {
      handleAuthError();
    }
  }, [orderId, isAuthenticated, token]);

  return {
    order,
    loading,
    error,
    updateOrderStatus,
    refetchOrder: fetchOrder,
  };
};