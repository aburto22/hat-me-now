import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import SignUp from "../components/sign_up";

export default function SignUpPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <SignUp />
      <Footer />
    </div>
  );
}
