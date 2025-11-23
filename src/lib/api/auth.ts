 
import { apiConfig } from './config';
import { User } from '@/types';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface VerifyOTPData {
  email: string;
  otp: string;
}

interface ForgotPasswordData {
  email: string;
}

interface VerifyResetOTPData {
  email: string;
  otp: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

export const authAPI = {
  login: async (data: LoginData): Promise<{ user: User; token: string }> => {
    return apiConfig.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterData): Promise<{ message: string }> => {
    return apiConfig.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyOTP: async (data: VerifyOTPData): Promise<{ user: User; token: string }> => {
    return apiConfig.request('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: async (token: string): Promise<{ message: string }> => {
    return apiConfig.authRequest('/api/auth/logout', token, {
      method: 'POST',
    });
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    return apiConfig.request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyResetOTP: async (data: VerifyResetOTPData): Promise<{ message: string }> => {
    return apiConfig.request('/api/auth/verify-reset-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    return apiConfig.request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};