// src/components/home/FeaturedCategories.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Shirt, ShoppingBag, Footprints, Watch } from 'lucide-react';

const categories = [
  {
    id: 'shoes',
    name: 'Shoes',
    icon: Footprints,
    description: 'Latest footwear trends',
  },
  {
    id: 'clothes',
    name: 'Clothes', 
    icon: Shirt,
    description: 'Fashion apparel',
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: ShoppingBag,
    description: 'Stylish carry options',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Watch,
    description: 'Complete your look',
  },
];

export function FeaturedCategories() {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600">Discover our curated collections</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => router.push(`/products?category=${category.id}`)}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-[#5156D2] rounded-full mx-auto flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}