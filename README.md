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
CodeAlpha_Ecommerce_Frontend/
│
├── public/
│ # Static assets (images, icons, fonts)
│
├── src/
│ ├── app/
│ │ ├── layout.js
│ │ ├── page.js
│ │ └── globals.css
│ │
│ ├── components/
│ │ ├── Header.js
│ │ ├── Footer.js
│ │ ├── ProductCard.js
│ │ └── CartItem.js
│ │
│ ├── hooks/
│ │ └── useCart.js
│ │
│ ├── services/
│ │ └── api.js
│ │
│ ├── pages/
│ │ ├── login.js
│ │ ├── register.js
│ │ ├── products/[id].js
│ │ └── cart.js
│ │
│ └── utils/
│ └── formatCurrency.js
│
├── .gitignore
├── package.json
├── tailwind.config.js
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
