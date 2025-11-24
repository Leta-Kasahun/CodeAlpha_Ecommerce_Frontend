// src/app/(auth)/register/page.tsx
import { RegisterForm } from '@/src/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <RegisterForm />
      </div>
    </div>
  );
}