// src/components/home/faq/FAQAccordion.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingBag, Truck, Shield, Star, RefreshCw, Tag, Package, CreditCard } from 'lucide-react';
import { FAQItem } from './types';

// Icon mapping
const iconMap: { [key: string]: any } = {
  ShoppingBag,
  Truck,
  Shield,
  Star,
  RefreshCw,
  Tag,
  Package,
  CreditCard
};

interface FAQAccordionProps {
  faqItems: FAQItem[];
}

export function FAQAccordion({ faqItems }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-3">
      {faqItems.map((item) => {
        const IconComponent = iconMap[item.icon];
        const isOpen = openItems.includes(item.id);
        
        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg bg-white hover:border-[#5156D2]/40 transition-colors duration-200"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-4 sm:px-6 sm:py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-[#5156D2] flex-shrink-0" />
                <span className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                  {item.question}
                </span>
              </div>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 sm:px-6 sm:pb-4">
                    <div className="flex space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-4 sm:w-5"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {item.answer}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            item.category === 'payments' 
                              ? 'bg-blue-100 text-blue-800'
                              : item.category === 'security'
                              ? 'bg-green-100 text-green-800'
                              : item.category === 'shipping'
                              ? 'bg-purple-100 text-purple-800'
                              : item.category === 'products'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}