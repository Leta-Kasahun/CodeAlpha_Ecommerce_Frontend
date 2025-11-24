// src/components/home/PeopleAlsoAsk.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FAQAccordion } from './faq/FAQAccordion';
import { FAQData } from './faq/types';

export function PeopleAlsoAsk() {
  const [faqData, setFaqData] = useState<FAQData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch('/data/faqData.json');
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error('Error loading FAQ data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse text-gray-600">Loading FAQs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about our products and services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        {faqData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <FAQAccordion faqItems={faqData.faqItems} />
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Can't find what you're looking for?
          </p>
          <button className="bg-[#5156D2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4549C7] transition-colors text-sm sm:text-base">
            Contact Our Support Team
          </button>
        </motion.div>
      </div>
    </section>
  );
}