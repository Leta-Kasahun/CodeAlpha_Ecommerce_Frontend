// src/components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterStepForm } from './RegisterStepForm';

export function RegisterForm() {
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email);
    setStep('verify');
    // Use Next.js router for navigation
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  };

  return <RegisterStepForm onRegistrationSuccess={handleRegistrationSuccess} />;
}