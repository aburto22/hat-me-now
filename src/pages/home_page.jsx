import React from "react";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
