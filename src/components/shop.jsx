import React from "react";
import AllItemsTiles from "./shop/all_items_tiles";

export default function Shop() {
  return (
    <main className="max-w-4xl mx-auto border border-gray-light flex flex-col items-center pb-8 text-gray-primary bg-white overflow-hidden">
      <div className="self-stretch relative">
        <img
          src="/images/general/shop-hat-large.jpg"
          srcSet="/images/general/shop-hat-large.jpg 900w, /images/general/shop-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
          alt="Woman with hat with flower"
          className="w-full h-48 object-cover border-b border-gray-light mb-10"
        />
        <div className="absolute bg-white bg-opacity-90 top-1/4 w-full py-4">
          <h1 className="text-xl text-center">What are you looking for today?</h1>
        </div>
      </div>
      <div className="bg-white">
        <AllItemsTiles />
      </div>
    </main>
  );
}
