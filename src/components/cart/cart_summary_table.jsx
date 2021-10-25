import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { getItemById } from "../../helpers/db";
import toUsd from "../../helpers/money";
import * as ROUTES from "../../constants/routes";
import CartItem from "./cart_item";

export default function CartSummaryTable({ items, setItems }) {
  const history = useHistory();
  const [cart, setCart] = useState(localStorage.getItem("cart"));

  useEffect(() => {
    async function getCartItems() {
      Promise.all(
        JSON.parse(localStorage.getItem("cart")).map(async (item) => {
          const itemDb = await getItemById(item.itemId);

          return {
            ...itemDb,
            qtyStock: itemDb.qty,
            qty: item.qty,
          };
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

    if (localStorage.getItem("cart")) {
      getCartItems();
    } else {
      setCart(JSON.stringify([]));
    }
  }, [cart]);

  const itemsTable = items.map((item) => (
    <CartItem key={item.itemId} setCart={setCart} item={item} />
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
          You don&apos;t have any items on your cart. Go shopping now!
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
