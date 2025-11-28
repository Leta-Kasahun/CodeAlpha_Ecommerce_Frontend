// src/components/home/HeroSection.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <Star className="h-4 w-4 text-[#E6B84A] fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  Premium Fashion Destination
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="bg-gradient-to-r from-[#5156D2] to-[#E6B84A] bg-clip-text text-transparent">
                  {" "}Perfect Style
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Explore our curated collection of fashion, accessories, and lifestyle products. 
                Quality meets style in every piece we offer.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/products")}
                className="bg-[#5156D2] hover:bg-[#4549C7] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => router.push("/products?sale=true")}
                className="border-2 border-gray-300 hover:border-[#5156D2] text-gray-700 hover:text-[#5156D2] px-8 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                View Sale
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image (Replaced with image.png) */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative">
                
                {/* NEXT.JS OPTIMIZED IMAGE */}
                <Image
                  src="/image.png"
                  alt="Hero Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw,
                         (max-width: 1200px) 50vw,
                         40vw"
                  priority
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E6B84A] rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#5156D2] rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
