// src/app/(auth)/error.tsx
'use client';

import { useEffect } from 'react';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Auth error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        
        <p className="text-gray-600 mb-2">
          Something went wrong during authentication.
        </p>
        
        <p className="text-sm text-gray-500 mb-8">
          {error.message || 'Please try again'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-[#5156D2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4549C7] transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/login'}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
}