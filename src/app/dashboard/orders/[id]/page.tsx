// src/app/dashboard/orders/[id]/page.tsx
import { OrderDetails } from '@/src/components/orders/OrderDetails';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderDetails orderId={params.id} />;
}