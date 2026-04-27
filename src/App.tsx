import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/features/CartSidebar";
import WhatsAppButton from "@/components/features/WhatsAppButton";
import { useCart } from "@/hooks/useCart";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Account from "@/pages/Account";
import Orders from "@/pages/Orders";
import Wishlist from "@/pages/Wishlist";
import Admin from "@/pages/Admin";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

function AppLayout() {
  const { isOpen, setIsOpen } = useCart();

  return (
    <>
      <Navbar onCartOpen={() => setIsOpen(true)} />
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AppLayout />
    </BrowserRouter>
  );
}
