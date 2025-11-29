// PaymentResult: simple status card shown after payment completes or fails.
'use client';

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentResultProps {
  success: boolean;
  orderId?: string;
  message?: string;
}

export const PaymentResult = ({ success, orderId, message }: PaymentResultProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
      {success ? (
        <>
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Successful</h3>
          <p className="text-sm text-gray-600 mt-2">{message ?? 'Your payment was completed successfully.'}</p>

          {orderId && (
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => router.push(`/dashboard/orders/${orderId}`)}
                className="px-4 py-2 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors"
              >
                View Order
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Failed</h3>
          <p className="text-sm text-gray-600 mt-2">{message ?? 'There was a problem processing your payment.'}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};