// File: src/components/seller/orders/SellerOrderDetails.tsx
'use client'

import { useSellerOrder } from '@/src/hooks/useSellerOrder'
import { X, Package, MapPin, CreditCard, User, Calendar, DollarSign } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface SellerOrderDetailsProps {
  orderId: string
  isOpen: boolean
  onClose: () => void
}

export function SellerOrderDetails({ orderId, isOpen, onClose }: SellerOrderDetailsProps) {
  const { order, loading, error, fetchOrder, clearOrder } = useSellerOrder()

  useEffect(() => {
    if (isOpen && orderId) {
      fetchOrder(orderId)
    }
  }, [isOpen, orderId, fetchOrder])

  useEffect(() => {
    if (!isOpen) {
      clearOrder()
    }
  }, [isOpen, clearOrder])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 pb-8 overflow-y-auto">
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <p className="text-gray-600 text-sm mt-1">Complete order information</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5156D2]"></div>
              <p className="ml-4 text-gray-600 text-lg">Loading order details...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg mb-6">Error: {error}</p>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-[#5156D2] text-white rounded-lg hover:bg-[#4347c4] transition-colors font-medium"
              >
                Close
              </button>
            </div>
          )}

          {order && !loading && (
            <div className="space-y-8">
              {/* Order Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer & Payment Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#5156D2]" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="text-gray-900">{order.user.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Email:</span>
                        <span className="text-gray-900">{order.user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#5156D2]" />
                      Payment Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Method:</span>
                        <span className="text-gray-900 capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-[#E6B84A] text-white'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order & Shipping Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#5156D2]" />
                      Order Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Order Date:</span>
                        <span className="text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Order Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.orderStatus === 'processing' ? 'bg-[#E6B84A] text-white' :
                          order.orderStatus === 'shipped' ? 'bg-[#5156D2] text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {order.orderStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">Order ID:</span>
                        <span className="text-gray-900 font-mono text-sm">{order._id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#5156D2]" />
                        Shipping Address
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-900">{order.shippingAddress.city}</p>
                        <p className="text-gray-900">{order.shippingAddress.postalCode}</p>
                        <p className="text-gray-900">{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#5156D2]" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-6 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="shrink-0">
                        {item.product.images?.[0] ? (
                          <Image 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.product.name}</h4>
                        <div className="flex gap-6 text-sm text-gray-600">
                          <span>Quantity: <strong className="text-gray-900">{item.qty}</strong></span>
                          <span>Price: <strong className="text-[#5156D2]">${item.price}</strong></span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">Total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-[#5156D2] rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-white" />
                    <div>
                      <p className="text-white text-lg font-medium">Total Amount</p>
                      <p className="text-white text-opacity-90 text-sm">Including all items</p>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-white">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}