// src/app/(auth)/verify-reset-otp/page.tsx
import { VerifyResetOTPForm } from '@/src/components/auth/VerifyResetOTPForm';

export default function VerifyResetOTPPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <VerifyResetOTPForm />
      </div>
    </div>
  );
}