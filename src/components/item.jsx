import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getItemById } from "../helpers/db";
import toUsd from "../helpers/money";
import { addItemToCart, getCartItemsNum } from "../helpers/local_storage";
import Loading from "./common/loading";
import * as ROUTES from "../constants/routes";
import CartContext from "../context/cart_context";

export default function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [isItemBought, setIsItemBought] = useState(false);
  const { setCartItemsNum } = useContext(CartContext);

  const defaultDescription =
    "An amazing hat. You need to get it NOW! Seriously, who won't fancy a hat like this? You definitely do.";

  useEffect(() => {
    async function getItem() {
      const itemDb = await getItemById(itemId);
      setItem(itemDb);
    }

    getItem();
  }, []);

  function handleIncreaseQty() {
    if (qty < item.qty) {
      setQty((current) => current + 1);
    }
  }

  function handleDecreaseQty() {
    if (qty > 1) {
      setQty((current) => current - 1);
    }
  }

  async function handleClick() {
    await addItemToCart(itemId, qty);
    const cartItemsNum = getCartItemsNum();
    setCartItemsNum(cartItemsNum);
    setIsItemBought(true);
  }

  return (
    <main className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center px-4 text-gray-primary relative">
      <Link
        to={ROUTES.SHOP}
        className="text-blue-primary hover:text-blue-hover text-xs flex absolute top-4 left-4 sm:left-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 25 25"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
        <p>Go back to the store</p>
      </Link>
      {item ? (
        <>
          <div className="flex flex-wrap pt-6 border-b border-gray-light mb-8 mx-0 mt-8 sm:mx-8 lg:mx-0 sm:w-full md:w-4/5">
            <div className="sm:w-1/2 mb-8 w-full">
              <img
                src={`/images/items/${item.name.toLowerCase()}.jpg`}
                className="w-96 mx-auto max-h-96 max-w-full sm:w-auto object-cover sm:object-fit"
                alt={item.alt}
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center mb-8">
              <h1 className="text-2xl mb-4">{item.name}</h1>
              <p className="text-xl mb-4">{toUsd(item.price)}</p>
              <div className="flex">
                <button type="button" onClick={handleDecreaseQty} aria-label="decrease quantity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <p className="border-b border-light-gray px-2 mx-2">{qty}</p>
                <button type="button" onClick={handleIncreaseQty} aria-label="increase quantity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs mt-2 mb-4 font-light">qty in stock: {item.qty}</p>
              <button
                type="button"
                onClick={handleClick}
                className={`text-white ${
                  isItemBought ? "bg-blue-disabled" : "bg-blue-primary-light"
                } ${!isItemBought && "hover:bg-blue-hover"} py-2 px-4 rounded ${
                  isItemBought && "cursor-default"
                }`}
                disabled={isItemBought}
              >
                {isItemBought ? "Item added to cart" : "Add to cart"}
              </button>
            </div>
          </div>
          <div className="mb-8 px-4 max-w-sm">
            <p className="text-center font-bold text-sm mb-2">Description:</p>
            <p className="font-light text-center">
              {item.description ? item.description : defaultDescription}
            </p>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
