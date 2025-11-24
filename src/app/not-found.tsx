// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-amber-600">404</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="bg-[#5156D2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4549C7] transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}