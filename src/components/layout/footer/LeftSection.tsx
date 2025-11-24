// src/components/layout/footer/LeftSection.tsx
'use client';

import { useState } from 'react';
import { Send, Phone } from 'lucide-react';

export function LeftSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      console.log('Subscribing email:', email);
      setEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-calculate warranty period (1 month from current date)
  const warrantyDate = new Date();
  warrantyDate.setMonth(warrantyDate.getMonth() + 1);
  const warrantyDateString = warrantyDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5156D2] to-[#E6B84A] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">ShopSphere</span>
            <span className="text-xs text-gray-400 -mt-1">Premium Fashion Store</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
          Your premier destination for traditional wear, tech fashion, and lifestyle accessories. 
          Quality meets style in every piece we offer.
        </p>
      </div>

      {/* Phone Number */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#5156D2] rounded-lg flex items-center justify-center">
          <Phone className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">Customer Support</p>
          <a href="tel:+251923695611" className="text-white font-semibold hover:text-[#E6B84A] transition-colors">
            +251 923 695 611
          </a>
        </div>
      </div>

      {/* Warranty Info */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          <span className="text-[#E6B84A] font-semibold">1-Month Warranty</span> on all fashion items
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Valid until {warrantyDateString}
        </p>
      </div>

      {/* Newsletter */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent text-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#5156D2] hover:bg-[#4549C7] text-white p-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500">
          Get updates on new collections and exclusive offers
        </p>
      </div>
    </div>
  );
}