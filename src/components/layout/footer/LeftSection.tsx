// src/components/layout/footer/LeftSection.tsx
'use client';

import { useState } from 'react';
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';

export function LeftSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

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

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5156D2] to-[#E6B84A] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">ShopSphere</span>
            <span className="text-sm text-gray-400 -mt-1">Premium Fashion Store</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
          Your premier destination for the latest fashion trends, quality accessories, 
          and lifestyle essentials.
        </p>
      </div>

      {/* Newsletter */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Join Our Newsletter</h3>
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5156D2] focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#5156D2] hover:bg-[#4549C7] text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Subscribe</span>
          </button>
        </form>
        <p className="text-sm text-gray-500">
          Stay updated with new products and exclusive offers
        </p>
      </div>

      {/* Social Links */}
      <div className="flex space-x-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.label}
              href={social.href}
              className="text-gray-400 hover:text-[#E6B84A] transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
              aria-label={social.label}
            >
              <Icon className="h-6 w-6" />
            </a>
          );
        })}
      </div>
    </div>
  );
}