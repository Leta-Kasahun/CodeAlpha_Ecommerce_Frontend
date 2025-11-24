// src/components/auth/ForgotPasswordForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/src/lib/validations/auth';
import { useAuth } from '@/src/hooks/useAuth';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ForgotPasswordForm() {
  const { loading, error, handleForgotPassword } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await handleForgotPassword(data);
    if (result.success) {
      router.push(`/verify-reset-otp?email=${encodeURIComponent(data.email)}`);
    }
  };

  return (
    <Card className="w-full border border-gray-200 shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 bg-[#5156D2] rounded-full flex items-center justify-center mb-3">
          <Mail className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900">Reset Password</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Enter your email to receive a reset OTP
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter your email"
                type="email"
                className="pl-12 h-12 text-base border-gray-300 focus:border-[#5156D2]"
                {...register('email')}
              />
            </div>
            {errors.email?.message && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-base text-red-600">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 px-4 py-2 bg-[#5156D2] text-white rounded-lg font-semibold text-lg hover:bg-[#3f43b3] focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending OTP...
              </>
            ) : (
              'Send Reset OTP'
            )}
          </button>

          <div className="text-center text-base pt-3">
            <Link href="/login" className="font-semibold text-[#5156D2] hover:text-[#3f43b3] transition-colors text-lg">
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}