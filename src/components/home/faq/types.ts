// src/components/home/faq/types.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: string;
  category: string;
}

export interface FAQData {
  faqItems: FAQItem[];
}