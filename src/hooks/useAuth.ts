// src/hooks/useAuth.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/src/lib/api';
import { useAuthStore } from '@/src/stores';
import { 
  RegisterFormData, 
  LoginFormData, 
  VerifyOTPFormData,
  registerSchema,
  loginSchema,
  verifyOTPSchema
} from '@/src/lib/validations/auth';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { login } = useAuthStore();

  const clearErrors = () => {
    setError('');
    setFieldErrors({});
  };

  const handleRegister = async (data: RegisterFormData) => {
    setLoading(true);
    clearErrors();

    try {
      // Validate with Zod
      registerSchema.parse(data);
      
      const result = await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password
      });

      return { success: true, data: result };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setFieldErrors(errors);
        return { success: false, error: 'Validation failed' };
      }
      
      setError(err.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);
    clearErrors();

    try {
      // Validate with Zod
      loginSchema.parse(data);
      
      const response = await authAPI.login({
        email: data.email,
        password: data.password
      });

      login(response.user, response.token);
      router.push('/');
      return { success: true, data: response };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setFieldErrors(errors);
        return { success: false, error: 'Validation failed' };
      }
      
      setError(err.message || 'Login failed. Please check your credentials.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (data: VerifyOTPFormData) => {
    setLoading(true);
    clearErrors();

    try {
      // Validate with Zod
      verifyOTPSchema.parse(data);
      
      const response = await authAPI.verifyOTP({
        email: data.email,
        otp: data.otp
      });

      login(response.user, response.token);
      router.push('/');
      return { success: true, data: response };
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setFieldErrors(errors);
        return { success: false, error: 'Validation failed' };
      }
      
      setError(err.message || 'Invalid verification code. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fieldErrors,
    setError,
    clearErrors,
    handleRegister,
    handleLogin,
    handleVerifyOTP
  };
}