// src/components/auth/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/src/lib/validations/auth';
import { useAuth } from '@/src/hooks/useAuth';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Link from 'next/link';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function LoginForm() {
  const { loading, error, handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin(data);
  };

  return (
    <Card className="w-full border border-gray-200 shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 bg-[#5156D2] rounded-full flex items-center justify-center mb-3">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Email Address"
                type="email"
                className="pl-12 h-12 text-base border-gray-300 focus:border-[#5156D2]"
                {...register('email')}
              />
            </div>
            {errors.email?.message && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="pl-12 pr-12 h-12 text-base border-gray-300 focus:border-[#5156D2]"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-sm font-semibold text-[#5156D2] hover:text-[#3f43b3] transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-base text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 px-4 py-2 bg-[#5156D2] text-white rounded-lg font-semibold text-lg hover:bg-[#3f43b3] focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-base pt-3">
            <span className="text-gray-600">Don't have an account? </span>
            <Link 
              href="/register" 
              className="font-semibold text-[#5156D2] hover:text-[#3f43b3] transition-colors text-lg"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}