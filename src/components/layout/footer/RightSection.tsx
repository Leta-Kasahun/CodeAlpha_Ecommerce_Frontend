// src/components/layout/footer/RightSection.tsx
'use client';

import { Truck, Shield, CreditCard } from 'lucide-react';

export function RightSection() {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $99',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% protected',
    },
    {
      icon: CreditCard,
      title: 'Easy Returns',
      description: '30-day policy',
    },
  ];

  const contactInfo = [
    {
      text: '+251 923 695 611',
      href: 'tel:+251923695611',
    },
    {
      text: 'support@shopsphere.com',
      href: 'mailto:support@shopsphere.com',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Quick Links */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/products" className="hover:text-[#E6B84A] transition-colors">All Products</a></li>
            <li><a href="/traditional" className="hover:text-[#E6B84A] transition-colors">Traditional Wear</a></li>
            <li><a href="/tech" className="hover:text-[#E6B84A] transition-colors">Tech Fashion</a></li>
            <li><a href="/accessories" className="hover:text-[#E6B84A] transition-colors">Accessories</a></li>
            <li><a href="/sale" className="hover:text-[#E6B84A] transition-colors">Sale Items</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/contact" className="hover:text-[#E6B84A] transition-colors">Contact Us</a></li>
            <li><a href="/shipping" className="hover:text-[#E6B84A] transition-colors">Shipping Info</a></li>
            <li><a href="/returns" className="hover:text-[#E6B84A] transition-colors">Returns & Exchanges</a></li>
            <li><a href="/size-guide" className="hover:text-[#E6B84A] transition-colors">Size Guide</a></li>
          </ul>
        </div>
      </div>

      {/* Features & Contact */}
      <div className="space-y-8">
        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Why Choose Us</h3>
          <div className="space-y-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-[#E6B84A]" />
                  <div>
                    <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                    <p className="text-gray-400 text-xs">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
          <div className="space-y-2">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="block text-gray-400 hover:text-[#E6B84A] transition-colors text-sm"
              >
                {contact.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}