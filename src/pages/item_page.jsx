import React from "react";
import Header from "../components/header";
import Item from "../components/item";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Item />
      <Footer />
    </div>
  );
}
