import React from "react";
import Header from "../components/header";

export default function NoteFoundPage() {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <div className="flex items-center justify-center w-full max-w-sm mx-auto">
        <p className="text-2xl mx-4 font-bold text-center">
          404! We couldn&apos;t find the page you were trying to open.
        </p>
      </div>
    </div>
  );
}
