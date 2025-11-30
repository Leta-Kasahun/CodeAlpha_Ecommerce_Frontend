// src/app/dashboard/orders/[id]/page.tsx
import { OrderDetails } from '@/src/components/orders/OrderDetails';

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  return <OrderDetails orderId={id} />;
}