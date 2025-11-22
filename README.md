# 🛍️ CodeAlpha E-Commerce Frontend

A modern and responsive **Next.js 16 frontend** for the **CodeAlpha E-Commerce Platform**, designed to connect seamlessly with the live backend API. Built with love for **CodeAlpha Internship**, it allows users to browse products, manage shopping carts and orders, process payments, leave reviews, and interact with sellers.  

---

## 🎯 Project Objectives

- Provide a complete e-commerce shopping experience through a responsive web interface.  
- Integrate fully with a live backend API to handle authentication, product management, cart operations, orders, payments, and reviews.  
- Allow users to upgrade to sellers, manage shop profiles, and sell products online.  
- Deliver a scalable and maintainable codebase using modern web development practices.  

---

## 📁 Folder Structure

---
```
codealpha-ecommerce-frontend/
│
├── app/                            # Next.js 16 App Router
│   ├── (auth)/                     # Authentication group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   ├── verify-otp/
│   │   │   └── page.tsx
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/                # Dashboard group
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Dashboard home
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── addresses/
│   │   │   └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   └── seller/                 # Seller dashboard
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       ├── page.tsx
│   │       │       └── edit.tsx
│   │       ├── orders/
│   │       │   └── page.tsx
│   │       └── analytics/
│   │           └── page.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── checkout/
│   │   └── page.tsx
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── search/
│   │   └── page.tsx
│   │
│   ├── api/                        # Frontend API routes
│   │   ├── auth/
│   │   │   └── route.ts
│   │   ├── cart/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── route.ts
│   │
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Homepage
│   ├── loading.tsx                 # Loading UI
│   ├── error.tsx                   # Error boundary
│   └── not-found.tsx               # 404 page
│
├── components/                     # Reusable components
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── table.tsx
│   │   ├── badge.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   └── ... (all shadcn components)
│   │
│   ├── layout/                     # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   └── provider.tsx            # Context providers
│   │
│   ├── auth/                       # Auth components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── otp-form.tsx
│   │   └── protected-route.tsx
│   │
│   ├── product/                    # Product components
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-details.tsx
│   │   ├── product-images.tsx
│   │   ├── product-reviews.tsx
│   │   ├── review-form.tsx
│   │   ├── add-to-cart.tsx
│   │   └── quantity-selector.tsx
│   │
│   ├── cart/                       # Cart components
│   │   ├── cart-item.tsx
│   │   ├── cart-sidebar.tsx
│   │   ├── cart-summary.tsx
│   │   └── cart-badge.tsx
│   │
│   ├── order/                      # Order components
│   │   ├── order-card.tsx
│   │   ├── order-summary.tsx
│   │   ├── order-timeline.tsx
│   │   └── order-filters.tsx
│   │
│   ├── search/                     # Search components
│   │   ├── search-bar.tsx
│   │   ├── search-suggestions.tsx
│   │   ├── filter-sidebar.tsx
│   │   ├── sort-dropdown.tsx
│   │   └── pagination.tsx
│   │
│   ├── checkout/                   # Checkout components
│   │   ├── checkout-steps.tsx
│   │   ├── address-form.tsx
│   │   ├── payment-method.tsx
│   │   └── order-review.tsx
│   │
│   ├── dashboard/                  # Dashboard components
│   │   ├── stats-cards.tsx
│   │   ├── recent-orders.tsx
│   │   ├── quick-actions.tsx
│   │   └── charts/
│   │       ├── sales-chart.tsx
│   │       └── revenue-chart.tsx
│   │
│   └── forms/                      # Form components
│       ├── product-form.tsx
│       ├── profile-form.tsx
│       ├── address-form.tsx
│       └── review-form.tsx
│
├── lib/                            # Utilities & configurations
│   ├── api/                        # API services
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── orders.ts
│   │   ├── payments.ts
│   │   ├── reviews.ts
│   │   ├── search.ts
│   │   ├── users.ts
│   │   └── index.ts
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-cart.ts
│   │   ├── use-products.ts
│   │   ├── use-orders.ts
│   │   ├── use-search.ts
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   └── index.ts
│   │
│   ├── utils/                      # Utility functions
│   │   ├── cn.ts                   # Classname utilities
│   │   ├── formatters.ts           # Price, date formatters
│   │   ├── validators.ts           # Form validation
│   │   ├── constants.ts            # App constants
│   │   └── index.ts
│   │
│   ├── contexts/                   # React contexts
│   │   ├── auth-context.tsx
│   │   ├── cart-context.tsx
│   │   ├── theme-context.tsx
│   │   └── index.ts
│   │
│   └── validations/                # Form validations
│       ├── auth-schema.ts
│       ├── product-schema.ts
│       ├── order-schema.ts
│       └── index.ts
│
├── types/                          # TypeScript type definitions
│   ├── api.ts                      # API response types
│   ├── auth.ts                     # Authentication types
│   ├── product.ts                  # Product types
│   ├── cart.ts                     # Cart types
│   ├── order.ts                    # Order types
│   ├── user.ts                     # User types
│   └── index.ts
│
├── store/                          # State management (Zustand)
│   ├── auth-store.ts
│   ├── cart-store.ts
│   ├── product-store.ts
│   ├── ui-store.ts
│   └── index.ts
│
├── styles/                         # Global styles
│   ├── globals.css
│   └── components.css
│
├── public/                         # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo-dark.png
│   │   ├── placeholder-product.jpg
│   │   └── heroes/
│   │       ├── home-hero.jpg
│   │       └── auth-hero.jpg
│   │
│   ├── icons/
│   │   ├── cart.svg
│   │   ├── user.svg
│   │   └── search.svg
│   │
│   └── favicon.ico
│
├── config/                         # App configurations
│   ├── site.ts                     # Site metadata
│   ├── api.ts                      # API configuration
│   └── theme.ts                    # Theme configuration
│
├── middleware.ts                   # Next.js middleware
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── components.json                 # shadcn/ui configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
└── README.md
```

---

## ⚡ Main Functionalities

- **User Authentication & Profile Management**  
  Register, login, and update profiles.  

- **Product Catalog & Search**  
  Browse products, view details, and search by category, price, or name.  

- **Shopping Cart & Orders**  
  Add, update, or remove items from the cart and place orders.  

- **Payment Processing**  
  Complete transactions through integrated payment endpoints.  

- **Reviews & Ratings**  
  Add, view, and update product reviews.  

- **Seller Marketplace**  
  Upgrade to seller, manage shop profile, and sell products.  

---

## 🔗 Backend API Endpoints

| Feature | Method | Endpoint | Example Payload / Query |
|---------|--------|----------|------------------------|
| **User Registration** | POST | [Register](https://ca-ecommerce-api.onrender.com/api/auth/register) | `{ "name":"test user","email":"test@example.com","password":"123456","confirmPassword":"123456" }` |
| **Verify OTP** | POST | [Verify OTP](https://ca-ecommerce-api.onrender.com/api/auth/verify-otp) | `{ "email":"test@example.com","otp":"123456" }` |
| **Login** | POST | [Login](https://ca-ecommerce-api.onrender.com/api/auth/login) | `{ "email":"test@example.com","password":"123456" }` |
| **User Profile** | GET | [Get Profile](https://ca-ecommerce-api.onrender.com/api/user-profile) | - |
| **Update Profile** | PUT | [Update Profile](https://ca-ecommerce-api.onrender.com/api/user-profile) | `{ "name":"updated name","phone":"+251911223344","address":{"city":"addis ababa","postalCode":"1000","country":"ethiopia"} }` |
| **Create Product** | POST | [Add Product](https://ca-ecommerce-api.onrender.com/api/products) | `{ "name":"wireless headphones","price":59.99,"quantity":15,"category":"electronics","description":"high-quality headphones","images":["headphone.jpg"] }` |
| **Get All Products** | GET | [Products](https://ca-ecommerce-api.onrender.com/api/products) | - |
| **Get Single Product** | GET | [Product Details](https://ca-ecommerce-api.onrender.com/api/products/PRODUCT_ID) | - |
| **Update Product** | PUT | [Update Product](https://ca-ecommerce-api.onrender.com/api/products/PRODUCT_ID) | `{ "price":49.99,"quantity":10 }` |
| **Search Products** | GET | [Search](https://ca-ecommerce-api.onrender.com/api/search/products?q=wireless&category=electronics&minPrice=20&maxPrice=100) | - |
| **Popular Products** | GET | [Popular](https://ca-ecommerce-api.onrender.com/api/search/popular) | - |
| **Add to Cart** | POST | [Add Cart](https://ca-ecommerce-api.onrender.com/api/cart/add) | `{ "productId":"PRODUCT_ID","quantity":2 }` |
| **Get Cart** | GET | [Cart](https://ca-ecommerce-api.onrender.com/api/cart) | - |
| **Update Cart** | PUT | [Update Cart](https://ca-ecommerce-api.onrender.com/api/cart/update/PRODUCT_ID) | `{ "quantity":3 }` |
| **Remove from Cart** | DELETE | [Remove Item](https://ca-ecommerce-api.onrender.com/api/cart/remove/PRODUCT_ID) | - |
| **Clear Cart** | DELETE | [Clear Cart](https://ca-ecommerce-api.onrender.com/api/cart/clear) | - |
| **Create Order** | POST | [Place Order](https://ca-ecommerce-api.onrender.com/api/orders) | `{ "shippingAddress":{"city":"addis ababa","postalCode":"1000","country":"ethiopia"},"paymentMethod":"card" }` |
| **Get Orders** | GET | [Orders](https://ca-ecommerce-api.onrender.com/api/orders) | - |
| **Update Order Status** | PUT | [Update Status](https://ca-ecommerce-api.onrender.com/api/orders/ORDER_ID/status) | `{ "status":"shipped" }` |
| **Payment** | POST | [Payments](https://ca-ecommerce-api.onrender.com/api/payments) | `{ "order":"ORDER_ID","amount":99.98,"method":"card" }` |
| **Process Payment** | PUT | [Process Payment](https://ca-ecommerce-api.onrender.com/api/payments/PAYMENT_ID/process) | `{ "status":"success" }` |
| **Payment History** | GET | [Payment History](https://ca-ecommerce-api.onrender.com/api/payments/history) | - |
| **Product Reviews** | POST | [Add Review](https://ca-ecommerce-api.onrender.com/api/reviews) | `{ "product":"PRODUCT_ID","rating":5,"comment":"excellent product!" }` |
| **Get Reviews** | GET | [Product Reviews](https://ca-ecommerce-api.onrender.com/api/reviews/product/PRODUCT_ID) | - |
| **Update Review** | PUT | [Update Review](https://ca-ecommerce-api.onrender.com/api/reviews/REVIEW_ID) | `{ "rating":4,"comment":"very good quality" }` |
| **Upgrade to Seller** | POST | [Seller Upgrade](https://ca-ecommerce-api.onrender.com/api/owners/upgrade) | `{ "shopName":"my tech store","phoneForOrders":"+251911223344","shopAddress":{"city":"addis ababa","postalCode":"1000","country":"ethiopia"} }` |
| **Seller Profile** | GET | [Get Seller](https://ca-ecommerce-api.onrender.com/api/owners/profile) | - |
| **Update Seller** | PUT | [Update Seller](https://ca-ecommerce-api.onrender.com/api/owners/profile) | `{ "phoneForOrders":"+251922334455" }` |

---

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Leta-Kasahun/CodeAlpha_Ecommerce_Frontend.git
cd CodeAlpha_Ecommerce_Frontend

📄 License

This project is licensed under the MIT License.
✉️ Contact

Email: letakasahun2@gmail.com

❤️ Built with love for CodeAlpha Internship
