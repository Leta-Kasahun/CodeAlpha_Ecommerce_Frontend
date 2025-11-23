// src/components/home/PromoBanner.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Tag, ArrowRight } from 'lucide-react';

export function PromoBanner() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-r from-[#5156D2] to-[#E6B84A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-6 py-3 rounded-full backdrop-blur-sm">
            <Tag className="h-5 w-5" />
            <span className="font-semibold">Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold">
            Summer Sale Up To 50% Off
          </h2>
          
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Don't miss out on our biggest sale of the season. Shop now and save on premium fashion items.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/products?sale=true')}
              className="bg-white text-[#5156D2] hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="text-white/80">
              <span className="font-semibold">Ends in:</span>
              <span className="ml-2">07 days : 23 hrs : 45 min</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}