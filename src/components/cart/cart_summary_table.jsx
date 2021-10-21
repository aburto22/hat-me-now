import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getItemById } from "../../helpers/db";
import { removeItemFromCart } from "../../helpers/local_storage";
import toUsd from "../../helpers/money";
import * as ROUTES from "../../constants/routes";

export default function CartSummaryTable({ items, setItems }) {
  const history = useHistory();
  const [cart, setCart] = useState(localStorage.getItem("cart"));

  useEffect(() => {
    async function getCartItems() {
      Promise.all(
        JSON.parse(cart).map(async (item) => {
          const itemDb = await getItemById(item.itemId);
          return { ...itemDb, qty: item.qty };
        })
      )
        .then((result) => {
          setItems(result);
        })
        .catch(() => {
          // console.error(err.message, err.code);
          history.push(ROUTES.ERROR);
        });
    }

    if (cart) {
      getCartItems();
    } else {
      setCart(JSON.stringify([]));
    }
  }, [cart]);

  function handleRemove(itemId) {
    const newCart = removeItemFromCart(itemId);
    setCart(JSON.stringify(newCart));
  }

  const itemsTable = items.map((item, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <tr key={index}>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        <Link to={`/item/${item.itemId}`} className="text-blue-primary hover:text-blue-hover">
          {item.name}
        </Link>
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        {item.qty}
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        {toUsd(item.price)}
      </td>
      <td className="border border-light-gray text-sm font-light py-1 px-2 sm:px-4 text-center">
        {toUsd(item.qty * item.price)}
      </td>
      <td>
        <button type="button" className="mx-2" onClick={() => handleRemove(item.itemId)}>
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
  ));

  const totalOrder = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {cart?.length > 2 ? (
        <table className="mb-8 mx-2">
          <thead>
            <tr>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
                Item
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
                Qty
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
                Unit Price
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
                Total Item Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsTable}
            <tr>
              <td
                colSpan={3}
                className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 "
              >
                Total
              </td>
              <td className="border border-light-gray py-2 px-2 text-center text-sm font-boldsm:px-4 ">
                {toUsd(totalOrder)}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="font-light mb-6 mx-2 text-center">
          You don&apos;t have any items on your cart. Go shipping now!
        </p>
      )}
    </>
  );
}

CartSummaryTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      itemId: PropTypes.string,
      price: PropTypes.number,
      qty: PropTypes.number,
    })
  ).isRequired,
  setItems: PropTypes.func.isRequired,
};
