 
import { apiConfig } from './config';
import { Order } from '@/types';

interface CreateOrderData {
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cash';
}

interface UpdateOrderStatusData {
  status: 'processing' | 'shipped' | 'completed';
}

export const ordersAPI = {
  createOrder: async (data: CreateOrderData, token: string): Promise<Order> => {
    return apiConfig.authRequest('/api/orders', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOrders: async (token: string): Promise<Order[]> => {
    return apiConfig.authRequest('/api/orders', token);
  },

  getOrder: async (id: string, token: string): Promise<Order> => {
    return apiConfig.authRequest(`/api/orders/${id}`, token);
  },

  updateOrderStatus: async (id: string, data: UpdateOrderStatusData, token: string): Promise<Order> => {
    return apiConfig.authRequest(`/api/orders/${id}/status`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getOrderHistory: async (token: string): Promise<Order[]> => {
    return apiConfig.authRequest('/api/order-history', token);
  },
};