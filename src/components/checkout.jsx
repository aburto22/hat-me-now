import React from "react";

export default function Checkout() {
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/checkout-hat.jpg"
          alt="Woman with hat with flower"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light">Checkout your order now!</h1>
        </div>
      </div>
      <p className="font-light mb-6 text-center max-w-md mx-2">
        So, you made it all this way, thanks for that. As you know, this is a prototype site, so
        checkout functions, such as forms to input delivery addresses and payment details, are not
        active. However, if you still want to &quot;checkout&quot; your order, click the bottom
        below and your order will be added to your profile! How great right?
      </p>
      <button
        type="button"
        className="px-4 py-2 bg-blue-primary text-white hover:bg-blue-hover rounded"
      >
        Checkout my order
      </button>
    </div>
  );
}