# Client Stores (auth + cart)

This document describes the Zustand stores implemented for the frontend and how to use them.

Files created
- src/store/auth-store.ts
- src/store/cart-store.ts
- src/store/index.ts

Design principles
- Auth store keeps user profile and the short-lived access token in memory (not persisted).
- Cart store persists to localStorage under a versioned key (`ca_cart_v1`) to survive refresh and browser close.
- Stores do not perform network requests. Use `src/lib/api` (or your preferred API layer) to call the backend and update stores with results.

Auth store API
- useAuth() returns the hook for the auth store.

API:
- user: User | null
- accessToken: string | null
- setUser(user: User, accessToken?: string | null): void
- setAccessToken(token: string | null): void
- clearAuth(): void
- isAuthenticated(): boolean

Example usage (after login):
```ts
import { useAuth } from "@/store";
import api from "@/lib/api"; // your api client

async function handleLogin(credentials) {
  const res = await api.post("/api/auth/login", credentials);
  // assume res.data = { user, accessToken } and refresh cookie is set by server
  useAuth.getState().setUser(res.data.user, res.data.accessToken);
}
```

On token refresh:
```ts
// after calling /api/auth/refresh and receiving new access token
useAuth.getState().setAccessToken(newAccessToken);
```

To logout:
```ts
// call backend logout endpoint (clears refresh cookie) then:
useAuth.getState().clearAuth();
```

Cart store API
- useCart() returns the hook for cart store.

State:
- items: CartItem[]

Actions:
- addItem(item: Omit<CartItem, "id"> & { id?: string }): add or increment quantity
- updateQuantity(itemId: string, quantity: number)
- removeItem(itemId: string)
- clearCart()

Helpers:
- getTotal(): number
- getCount(): number

Example usage (add product to cart):
```ts
import { useCart } from "@/store";

function addToCart(product) {
  useCart.getState().addItem({
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.images?.[0],
    quantity: 1,
  });
}
```

Selectively reading state in components:
```tsx
import { useCart } from "@/store";

export default function CartBadge() {
  const count = useCart((s) => s.getCount());
  return <span className="badge">{count}</span>;
}
```
