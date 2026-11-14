# 🛍️ CodeAlpha E-Commerce Platform

A complete full-stack e-commerce solution built with modern technologies for the **CodeAlpha Full Stack Development Internship**.
## 🎥 Project Demo screenshut
### Home page
---
<img width="952" height="483" alt="Screenshot 2025-12-02 080944" src="https://github.com/user-attachments/assets/f434f858-26d4-40d9-8790-8085057248b1" />

---
### Seller Dahbord
<img width="1900" height="971" alt="Screenshot 2025-12-02 082200" src="https://github.com/user-attachments/assets/959d9af6-f285-430c-aaec-77d5f7876931" />
---
### Client Dasboard
---
<img width="1897" height="961" alt="Screenshot 2025-12-02 082503" src="https://github.com/user-attachments/assets/455ba61c-f116-47fc-857f-0595b46fbb6d" />
----

## 🎥 Project Demo Video

Check out the full demo of my **CodeAlpha Social Media Platform**:

[![Watch the Demo on YouTube](https://img.youtube.com/vi/KzJTL3B7aGw/0.jpg)](https://youtu.be/KzJTL3B7aGw)  

Or click here: [YouTube Demo Video](https://youtu.be/KzJTL3B7aGw)

<video src="https://youtu.be/KzJTL3B7aGw" controls width="700">
</video>

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
CodeAlpha_Ecommerce_Frontend/
│
├─ public/
│   └─ (images, icons, static files)
│
├─ src/
│   ├─ app/
│   │   ├─ auth/
│   │   │   ├─ forgot-password/page.tsx
│   │   │   ├─ login/page.tsx
│   │   │   ├─ register/page.tsx
│   │   │   ├─ reset-password/page.tsx
│   │   │   ├─ verify-otp/page.tsx
│   │   │   ├─ verify-reset-otp/page.tsx
│   │   │   └─ layout.tsx
│   │   │
│   │   ├─ dashboard/
│   │   │   ├─ cart/page.tsx
│   │   │   ├─ checkout/page.tsx
│   │   │   ├─ orders/
│   │   │   │   ├─ page.tsx
│   │   │   │   └─ [id]/page.tsx
│   │   │   ├─ products/
│   │   │   │   ├─ page.tsx
│   │   │   │   └─ [id]/page.tsx
│   │   │   ├─ analytics/page.tsx
│   │   │   ├─ settings/page.tsx
│   │   │   ├─ upgrade/page.tsx
│   │   │   ├─ layout.tsx
│   │   │   └─ loading.tsx
│   │   │
<<<<<<< HEAD
│   │   ├─ home/page.tsx
=======
│   │   ├─global-error.tsx
>>>>>>> be17226 (build fixed)
│   │   │
│   │   ├─ products/
│   │   │   └─ [id]/page.tsx
│   │   │
│   │   ├─ seller/
│   │   │   ├─ analytics/page.tsx
│   │   │   ├─ orders/page.tsx
│   │   │   ├─ products/page.tsx
│   │   │   ├─ settings/page.tsx          
│   │   │   ├─ layout.tsx
│   │   │   ├─ loading.tsx
│   │   │   └─ not-found.tsx
│   │   │
│   │   ├─ error.tsx
│   │   ├─ layout.tsx
│   │   ├─ loading.tsx
│   │   ├─ not-found.tsx
│   │   └─ page.tsx
│   │
│   ├─ components/
│   │   ├─ auth/
│   │   │   ├─ ForgotPasswordForm.tsx
│   │   │   ├─ LoginForm.tsx
│   │   │   ├─ RegisterForm.tsx
│   │   │   ├─ RegisterStepForm.tsx
│   │   │   ├─ ResetPasswordForm.tsx
│   │   │   ├─ VerifyOTPForm.tsx
│   │   │   ├─ VerifyOTPPage.tsx
│   │   │   └─ VerifyResetOTPForm.tsx
│   │   │
│   │   ├─ cart/
│   │   │   ├─ AddToCartButton.tsx
│   │   │   ├─ CartItems.tsx
│   │   │   ├─ CartSummary.tsx
│   │   │   └─ CartView.tsx
│   │   │
│   │   ├─ checkout/
│   │   │   ├─ CheckoutForm.tsx
│   │   │   ├─ OrderSummary.tsx
│   │   │   ├─ PaymentMethodSelect.tsx
│   │   │   ├─ PaymentVerification.tsx
│   │   │   └─ ShippingAddressForm.tsx
│   │   │
│   │   ├─ seller/
│   │   │   ├─ analytics/
│   │   │   │   ├─ AnalyticsHeader.tsx
│   │   │   │   ├─ AnalyticsStats.tsx
│   │   │   │   ├─ MetricsGrid.tsx
│   │   │   │   ├─ OrderStatusChart.tsx
│   │   │   │   ├─ RevenueChart.tsx
│   │   │   │   └─ TopProductsChart.tsx
│   │   │   ├─ orders/
│   │   │   │   ├─ OrderCard.tsx
│   │   │   │   ├─ SellerOrderDetails.tsx
│   │   │   │   ├─ SellerOrderFilters.tsx
│   │   │   │   ├─ SellerOrders.tsx
│   │   │   │   ├─ SellerOrderStatus.tsx
│   │   │   │   └─ SellerOrderTable.tsx
│   │   │   ├─ products/
│   │   │   │   ├─ ProductCard.tsx
│   │   │   │   ├─ ProductForm.tsx
│   │   │   │   ├─ ProductFormFields.tsx
│   │   │   │   ├─ ProductImageUpload.tsx
│   │   │   │   ├─ ProductList.tsx
│   │   │   │   ├─ ProductListSkeleton.tsx
│   │   │   │   └─ ProductManager.tsx
│   │   │   └─ profile/
│   │   │   │       ├─ SellerProfile.tsx         
│   │   │   │       ├─ ShopProfile.tsx          
│   │   │   ├─ PerformanceChart.tsx
│   │   │   ├─ QuickActions.tsx
│   │   │   ├─ RecentProducts.tsx
│   │   │   ├─ SellerHeader.tsx
│   │   │   ├─ SellerLayout.tsx
│   │   │   ├─ SellerSidebar.tsx
│   │   │   ├─ SellerStats.tsx
│   │   │   ├─ ToOwner.tsx
│   │   │   ├─ UpgradeForm.tsx
│   │   │   └─ UpgradePage.tsx
│   │   │
│   │   ├─ dashboard/
│   │   │   ├─ FashionRecommendations.tsx
│   │   │   ├─ Navbar.tsx
│   │   │   ├─ RecentOrders.tsx
│   │   │   ├─ ReviewSection.tsx
│   │   │   ├─ SellButton.tsx
│   │   │   └─ Sidebar.tsx
│   │   │
│   │   ├─ home/
│   │   │   ├─ FeaturedCategories.tsx
│   │   │   ├─ FeaturedProducts.tsx
│   │   │   ├─ HeroSection.tsx
│   │   │   ├─ Newsletter.tsx
│   │   │   ├─ PeopleAlsoAsk.tsx         
│   │   │   └─ TrendingProducts.tsx
│   │   │
│   │   ├─ faq/
│   │   │   ├─ FAQAccordion.tsx
│   │   │   ├─ types.ts
│   │   │   └─ PeopleAlsoAsk.tsx         
│   │   │
│   │   ├─ layout/footer/
│   │   │   ├─ Footer.tsx
│   │   │   ├─ FooterBottom.tsx
│   │   │   ├─ LeftSection.tsx
│   │   │   └─ RightSection.tsx
│   │   │
│   │   ├─ nav/
│   │   │   ├─ AnimatedLogo.tsx
│   │   │   ├─ Header.tsx
│   │   │   ├─ Logo.tsx
│   │   │   ├─ MobileMenu.tsx
│   │   │   ├─ Navigation.tsx
│   │   │   ├─ SearchBar.tsx
│   │   │   └─ UserActions.tsx
│   │   │
│   │   ├─ navigation/
│   │   │   ├─ CategoryFilter.tsx
│   │   │   ├─ NotificationBell.tsx
│   │   │   ├─ SearchBar.tsx
│   │   │   └─ UserAvatar.tsx
│   │   │
│   │   ├─ orders/
│   │   │   ├─ OrderCard.tsx
│   │   │   ├─ OrderDashboard.tsx
│   │   │   ├─ OrderDetails.tsx
│   │   │   ├─ OrderFilters.tsx
│   │   │   ├─ OrderHeader.tsx
│   │   │   ├─ OrderHistory.tsx
│   │   │   ├─ OrderItems.tsx
│   │   │   ├─ OrderList.tsx
│   │   │   ├─ OrderShipping.tsx
│   │   │   ├─ OrderStatusBadge.tsx
│   │   │   ├─ OrderStatusTimeline.tsx
│   │   │   └─ PaymentStatusBadge.tsx
│   │   │
│   │   ├─ products/                     #
│   │   │   ├─ ProductCard.tsx
│   │   │   ├─ ProductDetails.tsx
│   │   │   ├─ ProductFilters.tsx
│   │   │   ├─ ProductSearch.tsx
│   │   │   ├─ ProductsGrid.tsx
│   │   │   ├─ ProductsGridSkeleton.tsx
│   │   │   ├─ ProductSorting.tsx
│   │   │   └─ ProductsPage.tsx
│   │   │
│   │   ├─ profile/UserProfile.tsx
│   │   │
│   │   ├─ reviews/
│   │   │   ├─ ProductReviews.tsx
│   │   │   ├─ ReviewForm.tsx
│   │   │   ├─ ReviewList.tsx
│   │   │   ├─ ReviewListWithFilter.tsx
│   │   │   ├─ ReviewStats.tsx
│   │   │   └─ StarRating.tsx
│   │   │
│   │   ├─ search/SearchBox.tsx
│   │   │
│   │   ├─ ui/
│   │   │   ├─ avatar.tsx
│   │   │   ├─ badge.tsx
│   │   │   ├─ button.tsx
│   │   │   ├─ card.tsx
│   │   │   ├─ dialog.tsx
│   │   │   ├─ dropdown-menu.tsx
│   │   │   ├─ ErrorDisplay.tsx
│   │   │   ├─ form.tsx
│   │   │   ├─ input.tsx
│   │   │   ├─ label.tsx
│   │   │   ├─ OptimizedImage.tsx
│   │   │   └─ Skeleton.tsx
│   │
│   ├─ hooks/
│   │   ├─ useAuth.ts
│   │   ├─ useCart.ts
│   │   ├─ useCategories.ts
│   │   ├─ useCreateOrder.ts
│   │   ├─ useOrder.ts
│   │   ├─ useOrders.ts
│   │   ├─ useOTP.ts
│   │   ├─ useOwner.ts
│   │   ├─ usePayments.ts
│   │   ├─ useProductRatings.ts
│   │   ├─ useReviews.ts
│   │   ├─ useSearch.ts
│   │   ├─ useSellerOrder.ts
│   │   ├─ useSellerOrders.ts
│   │   ├─ useSellerProducts.ts
│   │   ├─ useSellerProfile.ts
│   │   ├─ useShopProfile.ts
│   │   ├─ useSorting.ts
│   │   └─ useUserProfile.ts
│   │
│   ├─ lib/
│   │   ├─ api/
│   │   │   ├─ auth.ts
│   │   │   ├─ cart.ts
│   │   │   ├─ config.ts
│   │   │   ├─ index.ts
│   │   │   ├─ orders.ts
│   │   │   ├─ payments.ts
│   │   │   ├─ products.ts
│   │   │   ├─ reviews.ts
│   │   │   ├─ search.ts
│   │   │   ├─ sellerOrders.ts
│   │   │   ├─ sorting.ts
│   │   │   ├─ users.ts
│   │   │   ├─ validations/
│   │   │   │   ├─ auth.ts
│   │   │   │   └─ utils.ts
│   │   │   └─ utils.ts
│   │   ├─ utils.ts
│   │   ├─ validators.ts
│   │   └─ constants.ts
│   │
│   ├─ stores/                          
│   │   ├─ index.ts
│   │   ├─ useAuthStore.ts
│   │   ├─ useCartStore.ts
│   │   ├─ useProductStore.ts
│   │   ├─ useUIStore.ts
│   │   └─ types/
│   │       ├─ index.ts
│   │       └─ seller.ts
│   │
│   │
│   │
│   ├─ types/
│   │   ├─ auth.d.ts
│   │   ├─ product.d.ts
│   │   ├─ order.d.ts
│   │   └─ user.d.ts
│   │
│   └─ layout.tsx
│
├─ package.json
├─ tsconfig.json
├─ next.config.js
└─ README.md
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

