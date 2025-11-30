export interface SellerOrder {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: {
    product: {
      _id: string;
      name: string;
      price: number;
      owner: string;
    };
    qty: number;
    price: number;
    _id: string;
  }[];
  shippingAddress: {
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid';
  orderStatus: 'processing' | 'shipped' | 'completed';
  sellerOrderTotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerOrdersResponse {
  success: boolean;
  message: string;
  orders: SellerOrder[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  order: SellerOrder;
}

export interface DeleteOrderResponse {
  success: boolean;
  message: string;
  order: SellerOrder;
}

export interface SellerOrderFilters {
  status?: string;
  page?: number;
  limit?: number;
}