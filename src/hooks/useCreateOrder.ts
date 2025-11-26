// src/hooks/useCreateOrder.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersAPI } from '@/src/lib/api/orders';
import { useAuthStore } from '@/src/stores';

interface CreateOrderData {
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

interface UseCreateOrderReturn {
  createOrder: (data: CreateOrderData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useCreateOrder = (): UseCreateOrderReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const { token, isAuthenticated, logout } = useAuthStore();

  const handleAuthError = () => {
    logout();
    router.push('/login');
  };

  const createOrder = async (data: CreateOrderData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      if (!isAuthenticated || !token) {
        handleAuthError();
        return;
      }

      const response = await ordersAPI.createOrder(data, token);
      
      if (response.success) {
        setSuccess(true);
        // Redirect to order confirmation page
        router.push(`/dashboard/orders/${response.order._id}`);
      }
    } catch (err: any) {
      if (err.message?.includes('Invalid token') || err.message?.includes('Authentication')) {
        handleAuthError();
      } else {
        setError(err.message || 'Failed to create order');
        console.error('Error creating order:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createOrder,
    loading,
    error,
    success,
  };
};