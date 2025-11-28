// useOrder: fetch a single order by id and expose status update and refetch helpers.
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ordersAPI } from '@/src/lib/api/orders';
import { Order } from '@/src/types';
import { useAuthStore } from '@/src/stores';

export const useOrder = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(orderId));
  const [error, setError] = useState<string | null>(null);

  const { token, isAuthenticated, logout } = useAuthStore();

  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    if (!isAuthenticated || !token) {
      setError('Not authenticated');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await ordersAPI.getOrder(orderId, token);
      if (res && res.success && res.order) {
        setOrder(res.order);
      } else {
        setOrder(null);
        setError(res?.message || 'Order not found');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load order');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderId, isAuthenticated, token]);

  useEffect(() => {
    if (orderId && isAuthenticated && token) {
      fetchOrder();
    }
  }, [orderId, isAuthenticated, token, fetchOrder]);

  const refetchOrder = useCallback(async () => {
    await fetchOrder();
  }, [fetchOrder]);

  const updateOrderStatus = useCallback(async (newStatus: string) => {
    if (!orderId) throw new Error('Order id missing');
    if (!isAuthenticated || !token) {
      throw new Error('Not authenticated');
    }

    try {
      const res = await ordersAPI.updateOrderStatus(orderId, newStatus, token);
      if (res && res.success && (res as any).order) {
        setOrder((res as any).order as Order);
      } else {
        // fallback: optimistic update
        setOrder(prev => prev ? { ...prev, orderStatus: newStatus } : prev);
      }
      return true;
    } catch (err) {
      throw err;
    }
  }, [orderId, isAuthenticated, token]);

  return {
    order,
    loading,
    error,
    updateOrderStatus,
    refetchOrder
  };
};