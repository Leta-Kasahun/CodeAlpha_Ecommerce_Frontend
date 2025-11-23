// src/hooks/useCategories.ts
import { useCallback } from 'react';
import { searchAPI } from '@/src/lib/api';
import { useProductStore } from '@/src/stores';

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'Shirt',
    subcategories: ['shoes', 'clothes', 'accessories']
  },
  {
    id: 'bags',
    name: 'Bags',
    icon: 'ShoppingBag'
  },
  {
    id: 'shoes', 
    name: 'Shoes',
    icon: 'Footprints'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: 'Watch'
  }
];

export function useCategories() {
  const { setProducts } = useProductStore();

  const handleCategoryClick = useCallback(async (categoryId: string, subcategory?: string) => {
    try {
      const searchParams: any = { category: categoryId };
      if (subcategory) {
        searchParams.q = subcategory;
      }
      
      const { products } = await searchAPI.searchProducts(searchParams);
      setProducts(products);
    } catch (error) {
      console.error('Category search error:', error);
    }
  }, [setProducts]);

  return {
    categories,
    handleCategoryClick
  };
}