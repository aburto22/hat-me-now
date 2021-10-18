import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";

export default function LoginPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}
