// src/app/(auth)/reset-password/page.tsx
import { ResetPasswordForm } from '@/src/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <ResetPasswordForm />
      </div>
    </div>
  );
}