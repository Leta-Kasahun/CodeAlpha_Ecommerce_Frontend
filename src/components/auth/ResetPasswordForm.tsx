'use client';

// src/components/auth/ResetPasswordForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordFormData, resetPasswordSchema } from '@/src/lib/validations/auth';
import { useAuth } from '@/src/hooks/useAuth';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import Link from 'next/link';
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function ResetPasswordForm() {
  const { loading, error, handleResetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const resetToken = searchParams.get('resetToken') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange'
  });

  // Set email and resetToken values when component mounts
  useEffect(() => {
    if (email) setValue('email', email);
    if (resetToken) setValue('resetToken', resetToken);
  }, [email, resetToken, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    const result = await handleResetPassword(data);
    
    if (result.success) {
      router.push('/login');
    }
  };

  return (
    <Card className="w-full border border-gray-200 shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 bg-[#5156D2] rounded-full flex items-center justify-center mb-3">
          <KeyRound className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900">New Password</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Enter your new password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Hidden fields for email and resetToken */}
          <input type="hidden" {...register('email')} />
          <input type="hidden" {...register('resetToken')} />

          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                className="pl-12 pr-12 h-12 text-base border-gray-300 focus:border-[#5156D2]"
                {...register('newPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.newPassword?.message && (
              <p className="text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                className="pl-12 pr-12 h-12 text-base border-gray-300 focus:border-[#5156D2]"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-base text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isValid}
            className="w-full h-14 px-4 py-2 bg-[#5156D2] text-white rounded-lg font-semibold text-lg hover:bg-[#3f43b3] focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting Password...
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-center text-base pt-3">
            <Link
              href="/login"
              className="font-semibold text-[#5156D2] hover:text-[#3f43b3] transition-colors text-lg"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}