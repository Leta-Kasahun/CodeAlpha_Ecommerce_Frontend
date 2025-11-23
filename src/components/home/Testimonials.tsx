// src/components/home/Testimonials.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/src/components/ui/OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Aisha Mohammed',
    role: 'Traditional Fashion Designer',
    content: 'The traditional clothing collection is absolutely stunning! The fabric quality and attention to cultural details are remarkable. Every piece feels like a work of art that honors our heritage while embracing modern elegance.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop&crop=face',
    category: 'traditional',
    outfit: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Tech Entrepreneur',
    content: 'As someone in tech, I appreciate the smart clothing line. The moisture-wicking fabrics and ergonomic designs are perfect for my busy lifestyle. Comfort meets functionality in the most stylish way possible.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face',
    category: 'tech',
    outfit: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'Fatima Al-Mansoori',
    role: 'Cultural Ambassador',
    content: 'The elegant traditional wear makes me feel connected to my heritage while staying modern. Exceptional craftsmanship and attention to detail in every stitch. I always receive compliments when wearing ShopSphere pieces.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop&crop=face',
    category: 'traditional',
    outfit: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    role: 'Software Developer',
    content: 'The tech wear collection is perfect for long coding sessions. The breathable materials and smart pockets for devices make my workday so much more efficient. Style that actually works with my lifestyle.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&crop=face',
    category: 'tech',
    outfit: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop'
  },
  {
    id: 5,
    name: 'Yuki Tanaka',
    role: 'Fashion Influencer',
    content: 'I love how ShopSphere blends traditional elements with modern fashion. Each piece tells a beautiful story while being incredibly wearable. The quality surpasses luxury brands at a fraction of the price.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=600&fit=crop&crop=face',
    category: 'traditional',
    outfit: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop'
  },
  {
    id: 6,
    name: 'Marcus Johnson',
    role: 'Product Manager',
    content: 'The smart clothing technology integrated into everyday wear is revolutionary. Temperature regulation and stain resistance make these pieces indispensable for my busy schedule. Perfect for tech professionals who value both form and function.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&h=600&fit=crop&crop=face',
    category: 'tech',
    outfit: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=600&fit=crop'
  },
  {
    id: 7,
    name: 'Lena Petrova',
    role: 'Art Director',
    content: 'The fusion of traditional embroidery with contemporary silhouettes is breathtaking. Each piece feels unique and special. The craftsmanship reminds me of heirloom pieces but with modern wearability.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop&crop=face',
    category: 'traditional',
    outfit: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop'
  },
  {
    id: 8,
    name: 'David Kim',
    role: 'UX Designer',
    content: 'Finally, tech wear that doesn\'t sacrifice style for functionality. The smart fabrics and thoughtful design elements make these pieces perfect for creative professionals. I\'ve completely refreshed my wardrobe with ShopSphere.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop&crop=face',
    category: 'tech',
    outfit: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop'
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cachedTestimonials = useMemo(() => testimonials, []);

  // Auto-advance carousel with different timing
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % cachedTestimonials.length;
        
        // Speed up transition for certain intervals
        if (nextIndex % 2 === 0) {
          setTimeout(() => {
            setCurrentIndex((current) => (current + 1) % cachedTestimonials.length);
          }, 100); // Fast transition
        }
        
        return nextIndex;
      });
    }, 4000); // Base 4-second interval

    return () => clearInterval(interval);
  }, [cachedTestimonials.length, isPaused, isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % cachedTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + cachedTestimonials.length) % cachedTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const currentTestimonial = cachedTestimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5156D2] mb-2">
                <CountUp end={10000} duration={2.5} separator="," suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5156D2] mb-2">
                <CountUp end={500} duration={2} suffix="+" />
              </div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5156D2] mb-2">
                <CountUp end={98} duration={2.5} suffix="%" />
              </div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#5156D2] mb-2">
                <CountUp end={24} duration={2} suffix="/7" />
              </div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900"
          >
            Loved by Fashion Enthusiasts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover why thousands choose ShopSphere for their fashion journey
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div 
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Testimonial Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <Quote className="h-8 w-8 text-[#5156D2] opacity-60" />
                    
                    <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                      "{currentTestimonial.content}"
                    </p>

                    <div className="flex space-x-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#E6B84A] fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center space-x-4">
                      <OptimizedImage
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover border-4 border-[#5156D2]/10"
                        priority={currentIndex === 0}
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-600">{currentTestimonial.role}</p>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          currentTestimonial.category === 'traditional' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {currentTestimonial.category === 'traditional' ? 'Traditional Wear' : 'Tech Fashion'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Outfit Image */}
              <div className="relative bg-gradient-to-br from-[#5156D2] to-[#E6B84A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <OptimizedImage
                      src={currentTestimonial.outfit}
                      alt={`${currentTestimonial.name}'s outfit`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-white font-semibold text-sm ${
                  currentTestimonial.category === 'traditional' 
                    ? 'bg-amber-500/90' 
                    : 'bg-blue-500/90'
                }`}>
                  {currentTestimonial.category === 'traditional' ? 'Traditional' : 'Tech Wear'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {cachedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[#5156D2] w-8 h-3' 
                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Testimonial Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cachedTestimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/50 rounded-2xl p-6 border border-gray-200 hover:border-[#5156D2]/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-4">
                <OptimizedImage
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex space-x-1 mt-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-[#E6B84A] fill-current" />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}