import React from "react";
import Header from "../components/header";
import Cart from "../components/cart";
import Footer from "../components/footer";

export default function CartPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Cart />
      <Footer />
    </div>
  );
}
