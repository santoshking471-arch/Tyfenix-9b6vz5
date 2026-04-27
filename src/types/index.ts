export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  images: string[];
  description: string;
  features: string[];
  tags: string[];
  badge?: "sale" | "new" | "hot" | "bestseller";
  freeShipping: boolean;
  deliveryDays: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isAdmin: boolean;
  addresses: Address[];
  orders: string[];
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  address: Address;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
  trackingId?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minOrder: number;
  maxDiscount?: number;
  valid: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  color: string;
  count: number;
}
