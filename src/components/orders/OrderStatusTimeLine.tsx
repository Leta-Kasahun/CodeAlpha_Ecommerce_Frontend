// src/components/orders/OrderStatusTimeline.tsx
import { Order } from '@/src/types';
import { Check, Clock, Package, Truck } from 'lucide-react';

interface OrderStatusTimelineProps {
  order: Order;
  onStatusUpdate: (status: string) => Promise<void>;
}

export const OrderStatusTimeline = ({ order, onStatusUpdate }: OrderStatusTimelineProps) => {
  const statusSteps = [
    { 
      key: 'processing', 
      label: 'Processing', 
      description: 'Order is being processed',
      icon: Clock
    },
    { 
      key: 'shipped', 
      label: 'Shipped', 
      description: 'Order has been shipped',
      icon: Truck
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      description: 'Order delivered successfully',
      icon: Package
    },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.orderStatus);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
      </div>
      
      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const IconComponent = step.icon;
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                isCompleted
                  ? 'bg-[#5156D2] border-[#5156D2]'
                  : isCurrent
                  ? 'border-[#E6B84A] bg-white'
                  : 'border-gray-300 bg-white'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : isCurrent ? (
                  <IconComponent className="w-4 h-4 text-[#E6B84A]" />
                ) : (
                  <IconComponent className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-medium ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                <p className="text-sm text-gray-600 truncate">{step.description}</p>
                
                {isCurrent && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-[#E6B84A] text-white rounded-full">
                    Current Status
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};