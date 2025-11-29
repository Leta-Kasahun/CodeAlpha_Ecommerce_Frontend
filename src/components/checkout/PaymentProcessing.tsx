// PaymentProcessing: creates a payment record, processes it, refreshes cart on success and navigates to order details.
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePayments } from '@/src/hooks/usePayments';
import { useCart } from '@/src/hooks/useCart';
import { Loader2, Check, X } from 'lucide-react';

interface PaymentProcessingProps {
  orderId: string;
  amount: number;
  method?: 'card' | 'upi' | 'wallet' | 'cash';
  onComplete?: (orderId: string) => void;
  className?: string;
}

export const PaymentProcessing = ({
  orderId,
  amount,
  method = 'card',
  onComplete,
  className = ''
}: PaymentProcessingProps) => {
  const router = useRouter();
  const { createPayment, processPayment, loading, error, clearError } = usePayments();
  const { loadCart } = useCart();

  const handleRunPayment = async () => {
    clearError();
    try {
      // 1) create payment record (status: pending)
      const payment = await createPayment({ order: orderId, amount: Number(amount || 0), method });
      if (!payment || !payment._id) return;

      // 2) process payment (simulate success); on success backend clears cart
      const processed = await processPayment(payment._id, { status: 'success' }, async () => {
        // refresh client cart to reflect server-side cleared cart
        try {
          await loadCart();
        } catch (e) {
          // ignore load errors; UI will refresh later
        }
      });

      if (processed && processed.status === 'success') {
        if (typeof onComplete === 'function') {
          onComplete(orderId);
        } else {
          // default navigation to order details
          router.push(`/dashboard/orders/${orderId}`);
        }
      }
    } catch (e) {
      // usePayments sets error; nothing else to do here
      console.error('PaymentProcessing error', e);
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Complete Payment</h3>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Amount</span>
          <span className="text-[#5156D2] font-semibold">${Number(amount ?? 0).toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleRunPayment}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-3 px-4 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Pay Now'}
        </button>

        <button
          type="button"
          onClick={() => {
            // quick cancel/back action
            router.back();
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <X className="w-4 h-4 text-gray-400" />
          <span>Payments simulated in demo will instantly mark as paid</span>
        </div>
      </div>
    </div>
  );
};