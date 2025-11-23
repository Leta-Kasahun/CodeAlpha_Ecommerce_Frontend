// src/components/layout/footer/RightSection.tsx
'use client';

import { Truck, Shield, CreditCard, Phone, Mail, MapPin } from 'lucide-react';

export function RightSection() {
  const links = [
    {
      title: 'Shop',
      items: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?new=true' },
        { name: 'Best Sellers', href: '/products?bestsellers=true' },
        { name: 'Sale', href: '/products?sale=true' },
      ],
    },
    {
      title: 'Support',
      items: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $99',
    },
    {
      icon: Shield,
      title: '2-Year Warranty',
      description: 'Quality guaranteed',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: '100% protected',
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: Mail,
      text: 'support@shopsphere.com',
      href: 'mailto:support@shopsphere.com',
    },
    {
      icon: MapPin,
      text: '123 Fashion St, Style City',
      href: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Quick Links */}
      {links.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{section.title}</h3>
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-400 hover:text-[#E6B84A] transition-colors duration-200 text-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Features & Contact */}
      <div className="md:col-span-3 space-y-6">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center space-x-3 text-center md:text-left">
                <Icon className="h-8 w-8 text-[#E6B84A] flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
          <div className="space-y-3">
            {contactInfo.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.text}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-[#E6B84A] transition-colors duration-200 group"
                >
                  <Icon className="h-4 w-4 text-[#E6B84A] group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}