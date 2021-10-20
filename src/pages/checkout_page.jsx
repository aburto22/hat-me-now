import React from "react";
import Header from "../components/header";
import Checkout from "../components/checkout";
import Footer from "../components/footer";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
}
