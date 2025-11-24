// src/hooks/useAuth.ts
// Updated: redirect users to role-based dashboards after login / OTP verification.
// Preserves existing behavior and brand UI; no console logs.

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
      const dashboardRoute = role === 'owner' ? '/owner/dashboard' : '/client/dashboard';
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

      if (result && result.resetToken) {
        return {
          success: true,
          data: { resetToken: result.resetToken }
        };
      } else {
        throw new Error('Reset token not received');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid verification code';
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