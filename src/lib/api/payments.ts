 
import { apiConfig } from './config';
import { Payment } from '@/types';

interface CreatePaymentData {
  order: string;
  amount: number;
  method: 'card' | 'upi' | 'wallet' | 'cash';
}

interface ProcessPaymentData {
  status: 'success' | 'failed';
}

export const paymentsAPI = {
  createPayment: async (data: CreatePaymentData, token: string): Promise<Payment> => {
    return apiConfig.authRequest('/api/payments', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getUserPayments: async (token: string): Promise<Payment[]> => {
    return apiConfig.authRequest('/api/payments/history', token);
  },

  getPaymentByOrder: async (orderId: string, token: string): Promise<Payment> => {
    return apiConfig.authRequest(`/api/payments/order/${orderId}`, token);
  },

  processPayment: async (paymentId: string, data: ProcessPaymentData, token: string): Promise<Payment> => {
    return apiConfig.authRequest(`/api/payments/${paymentId}/process`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};