// src/components/auth/VerifyOTPForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useOTP } from '@/src/hooks/useOTP';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Mail, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function VerifyOTPForm({ email }: { email: string }) {
  const { loading, error, handleVerifyOTP, handleRegister } = useAuth();
  const { 
    otpArray, 
    countdown, 
    handleOtpChange, 
    handleKeyDown, 
    startCountdown, 
    isComplete 
  } = useOTP(6);
  const router = useRouter();

  // Start countdown when component mounts
  useEffect(() => {
    startCountdown(600); // 10 minutes
  }, [startCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleVerifyOTP({
      email,
      otp: otpArray.join('')
    });
    
    if (result.success) {
      router.push('/dashboard');
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    // This would call the resend OTP API
    // For now, we'll just restart the countdown
    startCountdown(600); // Restart 10 minute countdown
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full border border-gray-200 shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto w-14 h-14 bg-[#5156D2] rounded-full flex items-center justify-center mb-3">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold text-gray-900">Verify Your Email</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          We sent a 6-digit code to
        </CardDescription>
        <div className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-900">
          <Mail className="h-5 w-5 text-[#5156D2]" />
          {email}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700 text-center">
              Enter verification code
            </label>
            <div className="flex justify-between gap-3">
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#5156D2] focus:ring-2 focus:ring-[#5156D2] transition-colors"
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          {/* Countdown & Resend Section */}
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-lg text-gray-500">
                Resend code in {formatTime(countdown)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-lg font-semibold text-[#5156D2] hover:text-[#3f43b3] disabled:opacity-50 transition-colors"
              >
                Resend verification code
              </button>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-base text-red-600 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isComplete || loading}
            className="w-full h-14 px-4 py-2 bg-[#5156D2] text-white rounded-lg font-semibold text-lg hover:bg-[#3f43b3] focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </button>

          <div className="text-center">
            <Link href="/login" className="text-lg text-gray-600 hover:text-gray-900 font-medium">
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}