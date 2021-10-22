/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/user_context";
import { addOrderToUser } from "../helpers/db";

export default function Checkout() {
  const history = useHistory();
  const userId = useContext(UserContext);

  async function handleCheckout() {
    let cart = localStorage.getItem("cart");

    if (cart.length < 3) {
      return;
    }

    cart = JSON.parse(cart);

    const orderId = await addOrderToUser(userId, cart);

    localStorage.setItem("cart", []);

    history.push(`/order/${orderId}`);
  }

  // TODO add validator to prevent checkout if cart is empty.

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/checkout-hat-large.jpg"
          srcSet="/images/general/checkout-hat-large.jpg 900w, /images/general/checkout-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
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
        onClick={handleCheckout}
        className="px-4 py-2 bg-blue-primary-light text-white hover:bg-blue-hover rounded mb-4"
      >
        Checkout my order
      </button>
    </div>
  );
}
