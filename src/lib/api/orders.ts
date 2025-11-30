import { apiConfig } from './config'
import { Order } from '@/src/types'

interface CreateOrderData {
  shippingAddress: {
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cash'
}

interface OrdersResponse {
  success: boolean
  count?: number
  orders?: Order[]
  message?: string
}

interface OrderResponse {
  success: boolean
  order?: Order
  message?: string
}

interface OrderHistoryParams {
  status?: string
  startDate?: string
  endDate?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

interface OrderHistoryResponse {
  success: boolean
  message?: string
  orders?: Order[]
  total?: number
  page?: number
  pages?: number
  limit?: number
  hasNext?: boolean
  hasPrev?: boolean
}

export const ordersAPI = {
  createOrder: async (data: CreateOrderData, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest('/api/orders', token, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  getOrders: async (token: string): Promise<OrdersResponse> => {
    return apiConfig.authRequest('/api/orders', token)
  },

  getOrder: async (id: string, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest(`/api/orders/${id}`, token)
  },

  updateOrderStatus: async (id: string, status: string, token: string): Promise<OrderResponse> => {
    return apiConfig.authRequest(`/api/orders/${id}/status`, token, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
  },

  getOrderHistory: async (token: string, params?: OrderHistoryParams): Promise<OrderHistoryResponse> => {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })
    }
    
    const queryString = queryParams.toString()
    const url = `/api/order-history${queryString ? `?${queryString}` : ''}`
    
    return apiConfig.authRequest(url, token)
  },
}