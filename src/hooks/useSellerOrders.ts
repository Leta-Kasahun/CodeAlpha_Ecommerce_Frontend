import { useState, useEffect, useCallback } from 'react';
import { sellerOrdersAPI } from '@/src/lib/api/sellerOrders';
import { SellerOrder, SellerOrderFilters } from '@/src/types/seller';
import { useAuthStore } from '@/src/stores';

export const useSellerOrders = (filters?: SellerOrderFilters) => {
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 10
  });
  
  const { token, isAuthenticated } = useAuthStore();

  const fetchSellerOrders = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setError('Authentication required');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await sellerOrdersAPI.getSellerOrders(token, filters);
      
      if (response.success) {
        setOrders(response.orders || []);
        setPagination({
          total: response.total,
          page: response.page,
          pages: response.pages,
          limit: response.limit
        });
      } else {
        setError(response.message || 'Failed to fetch seller orders');
      }
    } catch (err: any) {
      setError(err.message || 'Network error while fetching seller orders');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token, filters]); // ✅ Added filters dependency

  const updateOrderStatus = useCallback(async (orderId: string, newStatus: string) => {
    if (!isAuthenticated || !token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await sellerOrdersAPI.updateOrderStatus(orderId, newStatus, token);
      
      if (response.success) {
        setOrders(prev => prev.map(order => 
          order._id === orderId ? response.order : order
        ));
        return response.order;
      } else {
        throw new Error(response.message || 'Failed to update order status');
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update order status');
    }
  }, [isAuthenticated, token]);

  const deleteOrder = useCallback(async (orderId: string) => {
    if (!isAuthenticated || !token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await sellerOrdersAPI.deleteOrder(orderId, token);
      
      if (response.success) {
        setOrders(prev => prev.filter(order => order._id !== orderId));
        return response.order;
      } else {
        throw new Error(response.message || 'Failed to delete order');
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete order');
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    fetchSellerOrders();
  }, [fetchSellerOrders]); // ✅ This will now refetch when filters change

  const refetch = useCallback(() => {
    fetchSellerOrders();
  }, [fetchSellerOrders]);

  return {
    orders,
    loading,
    error,
    pagination,
    updateOrderStatus,
    deleteOrder,
    refetch
  };
};