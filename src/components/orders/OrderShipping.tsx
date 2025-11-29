// src/components/orders/OrderShipping.tsx
"use client";

import { Order } from '@/src/types';
import { MapPin, FileText, CreditCard, Calendar } from 'lucide-react';

interface OrderShippingProps {
  order: Order;
}

export const OrderShipping = ({ order }: OrderShippingProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Shipping Information</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#5156D2]" />
            <h3 className="font-medium text-gray-700">Shipping Address</h3>
          </div>
          
          {order.shippingAddress ? (
            <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900 text-base">{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          ) : (
            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
              No shipping address provided
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#5156D2]" />
            <h3 className="font-medium text-gray-700">Order Details</h3>
          </div>
          
          <div className="space-y-3 text-sm bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Order ID:
              </span>
              <span className="font-medium text-[#5156D2] font-mono">{order._id.slice(-8).toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Order Date:
              </span>
              <span className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-1">
                <CreditCard className="w-3 h-3" />
                Payment Method:
              </span>
              <span className="text-gray-900 capitalize">{order.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Status:</span>
              <span className={`font-medium ${
                order.paymentStatus === 'paid' ? 'text-green-600' : 'text-[#E6B84A]'
              }`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};