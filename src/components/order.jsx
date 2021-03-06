import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import toUsd from "../helpers/money";
import { getOrderById, getItemById } from "../helpers/db";
import * as ROUTES from "../constants/routes";
import * as SVG from "./svg/svgs";
import Loading from "./common/loading";
import UserContext from "../context/user_context";

export default function Order() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const history = useHistory();
  const userId = useContext(UserContext);

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
          history.push(ROUTES.ERROR, { message: err.message, code: err.code });
        });
    }

    getOrderFromDb();
  }, []);

  const orderTable = order?.items.map((item) => (
    <tr key={item.itemId}>
      <td className="border border-light-gray text-sm py-1 px-2 mobile:px-4 text-center">
        <Link
          to={{ pathname: `/item/${item.itemId}`, state: { from: "order" } }}
          className="text-blue-primary hover:text-blue-hover"
        >
          {item.name}
        </Link>
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 mobile:px-4 text-center">
        {item.qty}
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 mobile:px-4 text-center">
        {toUsd(item.price)}
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 mobile:px-4 text-center">
        {toUsd(item.qty * item.price)}
      </td>
    </tr>
  ));

  const orderDisplay =
    userId === order?.userId ? (
      <>
        <h2 className="mb-6 mt-2 mx-4 text-center">
          Order Id: <span className="font-bold">{order.orderId}</span>
        </h2>
        <table className="mb-8 mx-2">
          <thead>
            <tr>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 mobile:px-4 text-center">
                Item
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 mobile:px-4 text-center">
                Qty
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 mobile:px-4 text-center">
                Unit Price
              </th>
              <th className="border border-light-gray text-sm font-bold py-2 px-2 mobile:px-4 text-center">
                Total Item Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {orderTable}
            <tr>
              <td
                colSpan={3}
                className="border border-light-gray text-sm font-bold py-2 px-2 mobile:px-4 "
              >
                Total Order Cost
              </td>
              <td className="border border-light-gray py-2 px-2 text-center text-sm font-bold mobile:px-4 ">
                {toUsd(order.totalCost)}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    ) : (
      <p className="my-10">Looks like this order doesn&apos;t belong to you!</p>
    );

  return (
    <main className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8 text-gray-primary relative">
      <div className="self-stretch relative">
        <img
          src="/images/general/order-hat-large.jpg"
          srcSet="/images/general/order-hat-large.jpg 900w, /images/general/order-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
          alt="Woman with hat lying on the ground"
          className="w-full h-48 object-cover border-b border-gray-light mb-10"
        />
        <div className="absolute bg-white bg-opacity-90 top-1/4 w-full py-4">
          <h1 className="text-xl text-center">Your order</h1>
        </div>
      </div>
      <Link
        to={ROUTES.PROFILE}
        className="text-blue-primary hover:text-blue-hover text-xs flex absolute top-52 left-4 mobile:left-8"
      >
        <SVG.BackArrow className="h-5 w-5" />
        <p>Go back to profile</p>
      </Link>
      {order ? orderDisplay : <Loading />}
    </main>
  );
}
