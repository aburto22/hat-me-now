import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user_context";
import * as ROUTES from "../constants/routes";
import CartSummaryTable from "./cart/cart_summary_table";

export default function Cart() {
  const [items, setItems] = useState([]);
  const userId = useContext(UserContext);

  const checkout = userId ? (
    <Link to={ROUTES.CHECKOUT}>
      <button
        type="button"
        className="py-2 px-4 bg-blue-primary-light text-white hover:bg-blue-hover rounded flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Proceed to check-out
      </button>
    </Link>
  ) : (
    <div>
      <p className="text-sm font-light text-center mb-6 max-w-sm px-2">
        You have to login before proceeding to the checkout. If you don&apos;t have an account, you
        can register. It is free!
      </p>
      <div className="flex flex-col max-w-sm sm:flex-row">
        <Link to={ROUTES.LOGIN} className="sm:w-1/2 px-4 sm:px-2 mb-2">
          <button
            type="button"
            className="rounded px-4 py-2 bg-blue-primary-light hover:bg-blue-hover text-white w-full"
          >
            Login
          </button>
        </Link>
        <Link to={ROUTES.SIGN_UP} className="sm:w-1/2 px-4 sm:px-2 mb-2">
          <button
            type="button"
            className="rounded px-4 py-2 border border-blue-primary text-blue-primary hover:border-blue-hover hover:text-blue-hover w-full"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <main className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8 text-gray-primary">
      <div className="self-stretch relative">
        <img
          src="/images/general/cart-hat-large.jpg"
          srcSet="/images/general/cart-hat-large.jpg 900w, /images/general/cart-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
          alt="Woman with hat in sepia"
          className="w-full h-48 object-cover border-b border-gray-light mb-10"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light text-black">Your cart</h1>
        </div>
      </div>
      <CartSummaryTable items={items} setItems={setItems} />
      {items.length > 0 && checkout}
    </main>
  );
}
