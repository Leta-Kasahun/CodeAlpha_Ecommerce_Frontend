// src/app/(auth)/forgot-password/page.tsx
import { ForgotPasswordForm } from '@/src/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}