import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toUsd from "../../helpers/money";
import CartContext from "../../context/cart_context";
import { removeItemFromCart, getCartItemsNum, changeItemQty } from "../../helpers/local_storage";
import * as SVG from "../svg/svgs";

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
        <Link
          to={{ pathname: `/item/${item.itemId}`, state: { from: "cart" } }}
          className="text-blue-primary hover:text-blue-hover font-medium"
        >
          {item.name}
        </Link>
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        <select value={qty} onChange={handleChangeQty}>
          {qtySelect}
        </select>
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        {toUsd(item.price)}
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        {toUsd(item.qty * item.price)}
      </td>
      <td>
        <button
          type="button"
          className="mx-2"
          onClick={() => handleRemove(item.itemId)}
          aria-label="remove item"
        >
          <SVG.Trash className="h-5 w-5" />
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
