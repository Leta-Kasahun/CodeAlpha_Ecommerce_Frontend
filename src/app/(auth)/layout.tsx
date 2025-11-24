// src/app/(auth)/layout.tsx
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#5156D2] to-[#E6B84A] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ShopSphere</span>
            </Link>
            <Link 
              href="/" 
              className="text-gray-600 hover:text-[#5156D2] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}