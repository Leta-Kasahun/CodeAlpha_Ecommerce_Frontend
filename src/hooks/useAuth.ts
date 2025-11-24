// src/hooks/useAuth.ts
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
      router.push('/');
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
      router.push('/');
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
      
      // Extract the resetToken from the API response
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

  // src/hooks/useAuth.ts - replace only the handleResetPassword function in this file

const handleResetPassword = async (data: any) => {
  setLoading(true);
  clearErrors();

  try {
    // Normalize token and email
    const rawToken = data?.resetToken ?? '';
    const normalizedToken = rawToken ? decodeURIComponent(String(rawToken)).trim() : '';
    const normalizedEmail = data?.email ? String(data.email).trim() : '';

    // Basic client-side validation to avoid sending malformed tokens
    if (!normalizedToken) {
      setError('Missing reset token.');
      return { success: false, error: 'Missing reset token' };
    }

    // Expect 64 hex chars from crypto.randomBytes(32).toString('hex')
    const HEX64_RE = /^[0-9a-f]{64}$/i;
    if (!HEX64_RE.test(normalizedToken)) {
      setError('Invalid reset token.');
      return { success: false, error: 'Invalid reset token' };
    }

    const payload = {
      ...data,
      resetToken: normalizedToken,
      email: normalizedEmail
    };

    const result = await authAPI.resetPassword(payload);
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