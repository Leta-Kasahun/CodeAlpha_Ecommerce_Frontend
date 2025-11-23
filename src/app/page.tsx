// src/app/page.tsx
import { HeroSection } from '@/src/components/home/HeroSection';
import { FeaturedCategories } from '@/src/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/src/components/home/FeaturedProducts';
import { PromoBanner } from '@/src/components/home/PromoBanner';
import { Testimonials } from '@/src/components/home/Testimonials';
import { Newsletter } from '@/src/components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </div>
  );
}