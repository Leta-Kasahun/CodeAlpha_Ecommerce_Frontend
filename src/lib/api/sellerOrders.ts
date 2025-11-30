import { apiConfig } from './config';
import { 
  SellerOrdersResponse, 
  UpdateOrderStatusResponse, 
  DeleteOrderResponse,
  SellerOrderFilters 
} from '@/src/types/seller';

export const sellerOrdersAPI = {
  getSellerOrders: async (token: string, filters?: SellerOrderFilters): Promise<SellerOrdersResponse> => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }
    
    const queryString = queryParams.toString();
    const url = `/api/seller/orders${queryString ? `?${queryString}` : ''}`;
    
    return apiConfig.authRequest(url, token);
  },

  updateOrderStatus: async (orderId: string, status: string, token: string): Promise<UpdateOrderStatusResponse> => {
    return apiConfig.authRequest(`/api/seller/orders/${orderId}/status`, token, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteOrder: async (orderId: string, token: string): Promise<DeleteOrderResponse> => {
    return apiConfig.authRequest(`/api/seller/orders/${orderId}`, token, {
      method: 'DELETE',
    });
  },
};