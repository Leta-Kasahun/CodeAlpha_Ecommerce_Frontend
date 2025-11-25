// src/hooks/useAuth.ts
// Updated: Fixed password reset token handling and error messages

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/src/lib/api';
import { useAuthStore } from '@/src/stores';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuthStore();

  const clearErrors = () => setError('');

  const handleRegister = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await authAPI.register(data);
      return { success: true, data: result };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const response = await authAPI.login(data);
      login(response.user, response.token);

      const role = response.user?.role;
      const dashboardRoute = role === 'owner' ? '/seller/' : '/dashboard';
      router.push(dashboardRoute);

      return { success: true, data: response };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const response = await authAPI.verifyOTP(data);
      login(response.user, response.token);

      const role = response.user?.role;
      const dashboardRoute = role === 'owner' ? '/owner/dashboard' : '/client/dashboard';
      router.push(dashboardRoute);

      return { success: true, data: response };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid OTP';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await authAPI.forgotPassword(data);
      return { success: true, data: result };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyResetOTP = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await authAPI.verifyResetOTP(data);

      // Handle various backend response structures safely
      const resetToken = result.resetToken || result.token || result.passwordResetToken || result.data;

      if (resetToken) {
        return {
          success: true,
          data: { resetToken }
        };
      } else {
        throw new Error('Reset token not received from server');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid or expired OTP';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: any) => {
    setLoading(true);
    clearErrors();

    try {
      const result = await authAPI.resetPassword(data);
      return { success: true, data: result };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset password';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setError,
    clearErrors,
    handleRegister,
    handleLogin,
    handleVerifyOTP,
    handleForgotPassword,
    handleVerifyResetOTP,
    handleResetPassword
  };
}