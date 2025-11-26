// Fixed orders API matching backend response structure
// Path: src/lib/api/orders.ts

import { apiConfig } from './config';
import { Order } from '@/src/types';

interface CreateOrderData {
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

interface OrdersResponse {
  success: boolean;
  count: number;
  orders: Order[];
}

interface OrderResponse {
  success: boolean;
  order: Order;
}

interface OrderHistoryResponse {
  success: boolean;
  message: string;
  orders: Order[];
  total?: number;
  page?: number;
  pages?: number;
}

export const ordersAPI = {
  createOrder: async (data: CreateOrderData, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest('/api/orders', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getOrders: async (token: string): Promise<OrdersResponse> => {
    return apiConfig.authRequest('/api/orders', token);
  },

  getOrder: async (id: string, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest(`/api/orders/${id}`, token);
  },

  updateOrderStatus: async (id: string, status: string, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest(`/api/orders/${id}/status`, token, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getOrderHistory: async (token: string, params?: any): Promise<OrderHistoryResponse> => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/api/order-history${queryParams ? `?${queryParams}` : ''}`;
    return apiConfig.authRequest(url, token);
  },
};