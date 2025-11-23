import { apiConfig } from './config';
import { Product } from '../../types';

interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

interface SearchSuggestionsParams {
  q: string;
}

export const searchAPI = {
  searchProducts: async (params: SearchParams): Promise<{ products: Product[]; total: number }> => {
    const queryParams = new URLSearchParams();
    
    if (params.q) queryParams.append('q', params.q);
    if (params.category) queryParams.append('category', params.category);
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    return apiConfig.request(`/api/search/products?${queryParams}`);
  },

  getSearchSuggestions: async (params: SearchSuggestionsParams): Promise<string[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append('q', params.q);
    return apiConfig.request(`/api/search/suggestions?${queryParams}`);
  },

  getPopularSearches: async (): Promise<string[]> => {
    return apiConfig.request('/api/search/popular');
  },

  sortProducts: async (sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append('sortBy', sortBy);
    queryParams.append('sortOrder', sortOrder);
    return apiConfig.request(`/api/sort/products?${queryParams}`);
  },
};