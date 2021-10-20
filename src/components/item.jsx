import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getItemById, addItemToCart } from "../helpers/db";
import toUsd from "../helpers/money";
import UserContext from "../context/user_context";

export default function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const userId = useContext(UserContext);
  const [isItemBought, setIsItemBought] = useState(false);

  const defaultDescription =
    "An amazing hat. You need to get it NOW! Seriusly, who won't fancy a hat like this? You definetely do.";

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
    if (userId) {
      const cart = await addItemToCart(userId, { itemId, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let cart = localStorage.getItem("cart");

      if (!cart) {
        cart = [];
      } else {
        cart = JSON.parse(cart);
      }

      cart.push({ itemId, qty });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setIsItemBought(true);
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center px-4">
      {item ? (
        <>
          <div className="flex flex-wrap pt-6 border-b border-gray-light mb-8 mx-0 sm:mx-8 lg:mx-0 sm:w-full md:w-4/5">
            <div className="sm:w-1/2 mb-8 w-full">
              <img
                src={`/images/items/${item.name.toLowerCase()}.jpg`}
                className="w-96 mx-auto max-h-96 max-w-full sm:w-auto object-cover sm:object-fit"
                alt={item.name}
              />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col items-center justify-center mb-8">
              <p className="text-2xl mb-4 text-gray-primary">{item.name}</p>
              <div className="flex">
                <button type="button" onClick={handleDecreaseQty}>
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
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <p className="border-b border-light-gray px-2 mx-2">{qty}</p>
                <button type="button" onClick={handleIncreaseQty}>
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
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs mb-4 font-light text-gray-primary">qty in stock: {item.qty}</p>
              <p className="text-xl text-gray-primary mb-4">{toUsd(item.price)}</p>
              <button
                type="button"
                onClick={handleClick}
                className={`text-white ${isItemBought ? "bg-blue-disabled" : "bg-blue-primary"} ${
                  !isItemBought && "hover:bg-blue-hover"
                } py-2 px-4 rounded ${isItemBought && "cursor-default"}`}
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
        <div className="py-20">
          <p>Loading Item</p>
        </div>
      )}
    </div>
  );
}
