// src/hooks/useCreateOrder.ts
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ordersAPI } from '@/src/lib/api/orders';
import { useAuthStore, useCartStore } from '@/src/stores';

interface CreateOrderData {
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

type CreateOrderResult =
  | { success: true; order: any; raw?: any }
  | { success: false; status?: string; error?: string; raw?: any };

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useAuthStore();
  const cartStore: any = useCartStore();
  const clearLocalCart = cartStore.clearCart ?? (() => cartStore.setCart?.({ items: [], total: 0 }));
  const router = useRouter();

  const createOrder = useCallback(
    async (data: CreateOrderData): Promise<CreateOrderResult> => {
      setError(null);

      if (!isAuthenticated || !token) {
        // Do not auto-logout or redirect here. Let the UI decide.
        return { success: false, status: 'unauthenticated', error: 'You must be signed in to place an order.' };
      }

      // Build body including cart items (fall back to mapping if helper missing)
      const itemsForBackend =
        typeof cartStore.toBackendFormat === 'function'
          ? cartStore.toBackendFormat().items
          : (Array.isArray(cartStore.items) ? cartStore.items : []).map((it: any) => ({
              product: typeof it.product === 'object' ? it.product._id : it.product,
              qty: it.qty,
            }));

      const body = { ...data, items: itemsForBackend };

      setLoading(true);
      try {
        const response = await ordersAPI.createOrder(body as any, token);

        // If your API wrapper returns success flag
        if (response && response.success) {
          // Only clear local cart AFTER server confirmed order creation
          try {
            clearLocalCart();
          } catch {
            // non-fatal: if store doesn't expose clearLocalCart, ignore
          }
          return { success: true, order: response.order ?? response.data ?? null, raw: response };
        }

        // Backend responded but indicated failure
        const msg = response?.message ?? 'Failed to create order';
        setError(msg);
        return { success: false, status: 'error', error: msg, raw: response };
      } catch (err: any) {
        // network or unexpected error - do not clear the cart
        const msg = err?.message ?? 'Network error while creating order';
        setError(msg);

        // If low-level fetch wrapper includes status, surface it
        if (err?.status === 401) {
          return { success: false, status: 'unauthorized', error: msg, raw: err };
        }

        return { success: false, status: 'network_error', error: msg, raw: err };
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, token, cartStore, clearLocalCart]
  );

  const clearError = useCallback(() => setError(null), []);

  return { createOrder, loading, error, clearError };
};