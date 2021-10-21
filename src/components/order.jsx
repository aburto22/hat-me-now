import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import toUsd from "../helpers/money";
import { getOrderById, getItemById } from "../helpers/db";
import * as ROUTES from "../constants/routes";
import Loading from "./common/loading";

export default function Order() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getOrderFromDb() {
      const orderDb = await getOrderById(orderId);

      Promise.all(
        orderDb.items.map(async (item) => {
          const itemInfo = await getItemById(item.itemId);

          return { ...item, name: itemInfo.name };
        })
      )
        .then((result) => {
          const orderWithItemInfo = {
            ...orderDb,
            items: result,
          };
          setOrder(orderWithItemInfo);
        })
        .catch((err) => {
          console.error(err.message, err.code);
          history.push(ROUTES.ERROR);
        });
    }

    getOrderFromDb();
  }, []);

  const orderTable = order?.items.map((item) => (
    <tr key={item.itemId}>
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
    </tr>
  ));

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8 text-gray-primary">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/order-hat.jpg"
          alt="Woman with hat lying on the ground"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light text-black">Your order</h1>
        </div>
      </div>
      {order ? (
        <>
          <h2 className="font-light mb-6">
            Order Id: <span className="font-bold">{order.orderId}</span>
          </h2>
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
              {orderTable}
              <tr>
                <td
                  colSpan={3}
                  className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 "
                >
                  Total Order Cost
                </td>
                <td className="border border-light-gray py-2 px-2 text-center text-sm font-boldsm:px-4 ">
                  {toUsd(order.totalCost)}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
