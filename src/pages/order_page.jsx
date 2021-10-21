import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Order from "../components/order";

export default function OrderPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Order />
      <Footer />
    </div>
  );
}
