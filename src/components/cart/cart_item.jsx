import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toUsd from "../../helpers/money";
import CartContext from "../../context/cart_context";
import { removeItemFromCart, getCartItemsNum, changeItemQty } from "../../helpers/local_storage";

export default function CartItem({ item, setCart }) {
  const { setCartItemsNum } = useContext(CartContext);
  const [qty, setQty] = useState(item.qty);

  function handleRemove(itemId) {
    const newCart = removeItemFromCart(itemId);
    setCart(JSON.stringify(newCart));
    const cartItemsNum = getCartItemsNum();
    setCartItemsNum(cartItemsNum);
  }

  function handleChangeQty(event) {
    const newQty = Number(event.target.value);
    setQty(newQty);
    const newCart = changeItemQty(item.itemId, newQty);
    setCart(JSON.stringify(newCart));
    const cartItemsNum = getCartItemsNum();
    setCartItemsNum(cartItemsNum);
  }

  const qtySelect = (() => {
    const arr = [];
    for (let i = 1; i <= Math.min(10, item.qtyStock); i += 1) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  })();

  return (
    <tr>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        <Link to={`/item/${item.itemId}`} className="text-blue-primary hover:text-blue-hover">
          {item.name}
        </Link>
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        <select value={qty} onChange={handleChangeQty}>
          {qtySelect}
        </select>
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        {toUsd(item.price)}
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        {toUsd(item.qty * item.price)}
      </td>
      <td>
        <button
          type="button"
          className="mx-2"
          onClick={() => handleRemove(item.itemId)}
          aria-label="remove item"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    qtyStock: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  setCart: PropTypes.func.isRequired,
};
