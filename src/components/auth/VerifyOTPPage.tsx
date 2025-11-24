// src/components/auth/VerifyOTPPage.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { VerifyOTPForm } from './VerifyOTPForm';

export function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  if (!email) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="p-8 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-lg text-red-600">Invalid verification request. Please try registering again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <VerifyOTPForm email={email} />
      </div>
    </div>
  );
}