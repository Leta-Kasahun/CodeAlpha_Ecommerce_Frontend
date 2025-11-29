// Payment page: client component wrapper that reads orderId and amount from query params and renders PaymentProcessing.
'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentProcessing } from '@/src/components/checkout/PaymentProcessing';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId') ?? '';
  const amountStr = searchParams?.get('amount') ?? '';
  const amount = useMemo(() => Number(amountStr || 0), [amountStr]);

  if (!orderId) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Missing order</h2>
          <p className="text-sm text-gray-600">No orderId provided. Please go back and retry checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment</h1>
      <PaymentProcessing orderId={orderId} amount={amount} />
    </div>
  );
}