# 🛍️ CodeAlpha E-Commerce Platform

A complete full-stack e-commerce solution built with modern technologies for the **CodeAlpha Full Stack Development Internship**.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)  
- [Core Objectives](#core-objectives)  
- [Main Features](#main-features)  
- [User Flow](#user-flow)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Configuration](#configuration)  
- [Installation](#installation)  
- [API Documentation](#api-documentation)  
- [Contact](#contact)  
- [License](#license)  

---

## 🎯 Project Overview

**CodeAlpha E-Commerce Platform** is a comprehensive online shopping solution that provides a seamless experience from product discovery to order fulfillment. The platform supports multiple user roles (customers and sellers) and includes advanced features like real-time search, payment processing, and order management.

---

## 🎯 Core Objectives

- Provide a modern, responsive e-commerce experience  
- Support both B2C and C2C marketplace models  
- Implement secure authentication and payment processing  
- Offer advanced product discovery and filtering  
- Enable sellers to manage their shops effectively  

---

## ⭐ Main Features

### 🔐 Authentication & Security
- User Registration with email OTP verification  
- Secure Login/Logout with JWT tokens  
- Password Reset functionality  
- Role-based Access Control (Customer/Seller)  

### 🛍️ Core E-Commerce
- Product Catalog with advanced filtering and search  
- Shopping Cart with persistent storage  
- Order Management with status tracking  
- Payment Processing simulation  
- Product Reviews & Ratings system  

### 🔍 Discovery & Search
- Real-time Search with suggestions  
- Advanced Filtering by category, price, ratings  
- Multiple Sorting options (price, date, popularity)  
- Popular Searches and trending products  

### 👥 User Management
- User Profiles with address management  
- Order History with advanced filtering  
- Wishlist functionality  
- Seller Dashboard for shop management  

### 🏪 Seller Features
- Seller Registration with shop profile  
- Product Management (CRUD operations)  
- Order Management for shop orders  
- Sales Analytics and insights  

---

## 🔄 User Flow

### 🛒 Customer Journey
**Browse & Discover**  
- View featured products on homepage  
- Search products with real-time suggestions  
- Filter and sort results  
- View product details and reviews  

**Shopping Cart**  
- Add products to cart  
- Manage quantities  
- Save for later (wishlist)  

**Checkout Process**  
- Review cart items  
- Select shipping address  
- Choose payment method  
- Complete order  

**Post-Purchase**  
- Track order status  
- View order history  
- Leave product reviews  
- Manage returns  

### 🏪 Seller Journey
**Shop Setup**  
- Register as seller  
- Create shop profile  
- Set up payment information  

**Product Management**  
- Add new products  
- Manage inventory  
- Update product information  
- Handle product categories  

**Order Management**  
- View incoming orders  
- Update order status  
- Process shipments  
- Manage customer communications  

---

## 🛠️ Tech Stack

### Frontend (Next.js 16 + TypeScript)
- **Framework:** Next.js 16 with App Router  
- **Language:** TypeScript for type safety  
- **Styling:** Tailwind CSS + shadcn/ui components  
- **State Management:** Zustand  
- **Forms:** React Hook Form + Zod validation  
- **Charts:** Recharts for analytics  

### Backend (Node.js + Express)
- **Runtime:** Node.js with Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Authentication:** JWT + bcrypt  
- **Email:** Nodemailer for OTP and notifications  
- **Deployment:** Render  

### Development Tools
- **Version Control:** Git + GitHub  
- **API Testing:** Postman/Thunder Client  
- **Package Manager:** npm  
- **Code Quality:** ESLint + Prettier  

---

## 📁 Project Structure

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

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Leta-Kasahun/CodeAlpha_Ecommerce_Frontend.git
cd CodeAlpha_Ecommerce_Frontend
```
---
## 📚 API Documentation

### Base URL
[https://ca-ecommerce-api.onrender.com](https://ca-ecommerce-api.onrender.com)

### Key Endpoints

- **Authentication:** [https://ca-ecommerce-api.onrender.com/api/auth/](https://ca-ecommerce-api.onrender.com/api/auth/)  
- **Products:** [https://ca-ecommerce-api.onrender.com/api/products/](https://ca-ecommerce-api.onrender.com/api/products/)  
- **Cart:** [https://ca-ecommerce-api.onrender.com/api/cart/](https://ca-ecommerce-api.onrender.com/api/cart/)  
- **Orders:** [https://ca-ecommerce-api.onrender.com/api/orders/](https://ca-ecommerce-api.onrender.com/api/orders/)  
- **Payments:** [https://ca-ecommerce-api.onrender.com/api/payments/](https://ca-ecommerce-api.onrender.com/api/payments/)  
- **Search:** [https://ca-ecommerce-api.onrender.com/api/search/](https://ca-ecommerce-api.onrender.com/api/search/)  
- **Users:** [https://ca-ecommerce-api.onrender.com/api/users/](https://ca-ecommerce-api.onrender.com/api/users/)  

---
### 🗝️ Key Configurations

- 🗄️ **Database:** MongoDB Atlas with connection pooling  
- 🔐 **Authentication:** JWT with 7-day expiration  
- 🌐 **CORS:** Configured for frontend domains  
- ⏱️ **Rate Limiting:** Implemented for API protection  
- ☁️ **File Upload:** Cloudinary integration ready  
- ⚡ **API Base URL:** Points to backend for all frontend requests  
- 🎨 **Styling:** Tailwind CSS + shadcn/ui  
- 🛠️ **Forms & Validation:** React Hook Form + Zod  
- 📊 **Charts & Analytics:** Recharts  
- 🔄 **State Management:** Zustand  

### 🚀 Setup Instructions
```bash
# Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configs
npm run dev

# Frontend Setup
cd ../frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your configs
npm run dev
```
---
## 📞 Contact

### Project Developer
**Leta Kasahun**  
💌 Email: [letakasahun77@gmail.com](mailto:letakasahun77@gmail.com)  
🔗 GitHub: [@letakasahun](https://github.com/letakasahun)  
💼 LinkedIn: [Leta Kasahun](https://www.linkedin.com/in/leta-kasahun)  

### CodeAlpha
🌐 Website: [www.codealpha.tech](https://www.codealpha.tech)  
💌 Email: [services@codealpha.tech](mailto:services@codealpha.tech)  
📱 WhatsApp: +91 8052293611  

---

## 📄 License

This project was developed as part of the **CodeAlpha Full Stack Development Internship** program. All rights reserved.  

**Usage Rights:**  
- Educational and portfolio use permitted  
- Commercial use requires permission  
- CodeAlpha internship submission  

---

## 🙏 Acknowledgments

- CodeAlpha for the internship opportunity  
- Mentors for guidance and support  
- Open source community for amazing tools and libraries  

---

## 💝 Built with Love

Crafted with ❤️ by **Leta Kasahun** for the **CodeAlpha Full Stack Development Internship**  

**Special Thanks:**  
To the entire CodeAlpha team for providing this incredible learning opportunity and supporting developers in their journey to become full-stack professionals.  

> "Code is like humor. When you have to explain it, it's bad." – Cory House  

Happy coding! 🚀

