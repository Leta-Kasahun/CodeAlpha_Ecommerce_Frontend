// src/lib/api/products.ts
// Products API with correct response types

import { apiConfig } from './config';
import { Product } from '@/src/types';

interface CreateProductData {
  name: string;
  price: number;
  quantity: number;
  category?: string;
  description?: string;
  images?: string[];
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
  count?: number;
}

interface ProductResponse {
  success: boolean;
  product: Product;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

export const productsAPI = {
  getProducts: async (): Promise<ProductsResponse> => {
    return apiConfig.request('/api/products');
  },

  getProduct: async (id: string): Promise<ProductResponse> => {
    return apiConfig.request(`/api/products/${id}`);
  },

  createProduct: async (data: CreateProductData, token: string): Promise<ProductResponse> => {
    return apiConfig.authRequest('/api/products', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateProduct: async (id: string, data: Partial<CreateProductData>, token: string): Promise<ProductResponse> => {
    return apiConfig.authRequest(`/api/products/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteProduct: async (id: string, token: string): Promise<MessageResponse> => {
    return apiConfig.authRequest(`/api/products/${id}`, token, {
      method: 'DELETE',
    });
  },
};