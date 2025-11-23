// User Types (matches User schema)
export interface User {
  _id: string
  name: string
  email: string
  role: 'client' | 'owner'
  phone?: string
  address?: {
    city: string
    postalCode: string
    country: string
  }
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

// Product Types (matches Product schema)
export interface Product {
  _id: string
  owner: string
  name: string
  price: number
  quantity: number
  category?: string
  images: string[]
  description?: string
  isAvailable: boolean
  createdAt: string
  updatedAt: string
}

// Cart Types (matches Cart schema)
export interface CartItem {
  product: string | Product
  qty: number
}

export interface Cart {
  _id: string
  user: string
  items: CartItem[]
  total: number
  createdAt: string
  updatedAt: string
}

// Order Types (matches Order schema)
export interface OrderItem {
  product: string | Product
  qty: number
  price: number
}

export interface Order {
  _id: string
  user: string
  orderItems: OrderItem[]
  shippingAddress?: {
    city: string
    postalCode: string
    country: string
  }
  totalPrice: number
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cash'
  paymentStatus: 'pending' | 'paid'
  orderStatus: 'processing' | 'shipped' | 'completed'
  createdAt: string
  updatedAt: string
}

// Payment Types (matches Payment schema)
export interface Payment {
  _id: string
  order: string | Order
  user: string | User
  amount: number
  method: 'card' | 'upi' | 'wallet' | 'cash'
  status: 'pending' | 'success' | 'failed'
  transactionNumber?: string
  createdAt: string
  updatedAt: string
}

// Review Types (matches Review schema)
export interface Review {
  _id: string
  product: string | Product
  user: string | User
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}

// Seller Profile Types (matches SellerProfile schema)
export interface SellerProfile {
  _id: string
  user: string | User
  shopName: string
  demoPayoutNumber?: string
  bankName?: string
  phoneForOrders?: string
  shopAddress?: {
    city: string
    postalCode: string
    country: string
  }
  isApproved: boolean
  createdAt: string
  updatedAt: string
}