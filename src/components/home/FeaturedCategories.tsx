// Featured categories component with optimized images from public folder
// Path: src/components/home/FeaturedCategories.tsx

'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

const categories = [
  {
    id: 'shoes',
    name: 'Shoes',
    image: '/image6.png',
    description: 'Latest footwear trends',
  },
  {
    id: 'clothes',
    name: 'Clothes',
    image: '/image4.png',
    description: 'Fashion apparel',
  },
  {
    id: 'bags',
    name: 'Bags',
    image: '/image3.png',
    description: 'Stylish carry options',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/image2.png',
    description: 'Complete your look',
  },
]

export function FeaturedCategories() {
  const router = useRouter()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="text-gray-600">Discover our curated collections</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => router.push(`/products?category=${category.id}`)}
              className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 text-left w-full"
            >
              <div className="space-y-3 md:space-y-4">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}