import React from "react";
import Header from "../components/header";

export default function HomePage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <div className="flex items-center justify-center w-full max-w-sm mx-auto">
        <p className="text-4xl font-bold text-center">Looks like there was an error.</p>
      </div>
    </div>
  );
}
