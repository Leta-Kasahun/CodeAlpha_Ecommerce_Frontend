// src/app/(auth)/loading.tsx
export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-[#5156D2] to-[#E6B84A] rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Authentication
        </h2>
        <p className="text-gray-600">
          Preparing your secure access...
        </p>
      </div>
    </div>
  );
}