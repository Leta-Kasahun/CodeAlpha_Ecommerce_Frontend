'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 'clothing', name: 'Clothing', href: '/products/clothing' },
  { id: 'footwear', name: 'Footwear', href: '/products/footwear' },
  { id: 'bags', name: 'Bags', href: '/products/bags' },
  { id: 'accessory', name: 'Accessory', href: '/products/accessory' }
];

export function Navigation() {
  const router = useRouter();

  const handleCategoryClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="flex items-center space-x-8">
      <button 
        onClick={() => router.push('/')}
        className="px-6 py-3 text-lg font-semibold text-gray-800 hover:text-[#5156D2] transition-colors duration-300"
      >
        Home
      </button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 px-6 py-3 text-lg font-semibold text-gray-800 hover:text-[#5156D2] transition-colors duration-300 group">
            <span>Products</span>
            <ChevronDown className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border border-gray-200 rounded-xl shadow-xl">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleCategoryClick(category.href)}
              className="px-6 py-4 text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#5156D2] cursor-pointer"
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <button 
        onClick={() => router.push('/about')}
        className="px-6 py-3 text-lg font-semibold text-gray-800 hover:text-[#5156D2] transition-colors duration-300"
      >
        About
      </button>
      <button 
        onClick={() => router.push('/contact')}
        className="px-6 py-3 text-lg font-semibold text-gray-800 hover:text-[#5156D2] transition-colors duration-300"
      >
        Contact
      </button>
    </nav>
  );
}