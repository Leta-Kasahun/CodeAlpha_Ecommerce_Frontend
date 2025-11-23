// src/components/home/Newsletter.tsx
'use client';

export function Newsletter() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-8">Get the latest updates on new products and exclusive offers</p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
          />
          <button className="bg-[#5156D2] px-6 py-3 rounded-r-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}