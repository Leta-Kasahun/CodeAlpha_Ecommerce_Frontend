// src/components/orders/PaymentStatusBadge.tsx

import { Order } from '@/src/types';

interface PaymentStatusBadgeProps {
  status: Order['paymentStatus'];
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: 'Payment Pending',
      color: 'bg-yellow-100 text-yellow-800',
    },
    paid: {
      label: 'Paid',
      color: 'bg-green-100 text-green-800',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};