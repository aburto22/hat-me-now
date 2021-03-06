import React from "react";
import Header from "../components/header";
import Profile from "../components/profile";
import Footer from "../components/footer";

export default function ProfilePage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Profile />
      <Footer />
    </div>
  );
}
