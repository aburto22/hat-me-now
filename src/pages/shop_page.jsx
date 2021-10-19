import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Shop from "../components/shop";

export default function ShopPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Shop />
      <Footer />
    </div>
  );
}
