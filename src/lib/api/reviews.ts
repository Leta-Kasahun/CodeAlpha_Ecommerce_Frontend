// File: src/lib/api/reviews.ts - FIXED RESPONSE HANDLING
import { apiConfig } from './config';
import { Review } from '@/src/types';

interface CreateReviewData {
  product: string;
  rating: number;
  comment?: string;
}

interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

interface ReviewsResponse {
  success: boolean;
  reviews?: Review[];
  count?: number;
  message?: string;
}

interface ReviewResponse {
  success: boolean;
  review?: Review;
  message?: string;
}

export const reviewsAPI = {
  createReview: async (data: CreateReviewData, token: string): Promise<ReviewResponse> => {
    return apiConfig.authRequest('/api/reviews', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getProductReviews: async (productId: string): Promise<ReviewsResponse> => {
    return apiConfig.request(`/api/reviews/product/${productId}`);
  },

  getReview: async (id: string): Promise<ReviewResponse> => {
    return apiConfig.request(`/api/reviews/${id}`);
  },

  updateReview: async (id: string, data: UpdateReviewData, token: string): Promise<ReviewResponse> => {
    return apiConfig.authRequest(`/api/reviews/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteReview: async (id: string, token: string): Promise<{ success: boolean; message?: string }> => {
    return apiConfig.authRequest(`/api/reviews/${id}`, token, {
      method: 'DELETE',
    });
  },
};