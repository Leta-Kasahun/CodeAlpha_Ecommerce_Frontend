// src/components/orders/OrderItems.tsx
import { Order } from '@/src/types';
import { Package, Plus } from 'lucide-react';

interface OrderItemsProps {
  order: Order;
}

export const OrderItems = ({ order }: OrderItemsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
      </div>
      
      <div className="space-y-3">
        {order.orderItems.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            {/* Product Image Placeholder */}
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {typeof item.product === 'string' ? `Product ${item.product.slice(-6)}` : item.product.name}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span>Qty: {item.qty}</span>
                <span className="flex items-center">
                  <Plus className="w-3 h-3 mr-1" />
                  ${item.price} each
                </span>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-[#5156D2]">${item.price}</p>
              <p className="text-sm text-gray-600">${(item.price * item.qty).toFixed(2)} total</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-[#5156D2]">${order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};