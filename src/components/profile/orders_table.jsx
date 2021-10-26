import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toUsd from "../../helpers/money";

export default function OrdersTable({ orders }) {
  const ordersList = orders.map((order) => (
    <tr key={order.orderId}>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        <Link
          to={`/order/${order.orderId}`}
          className="text-blue-primary font-medium hover:text-blue-hover"
        >
          {order.orderId}
        </Link>
      </td>
      <td className="border border-light-gray text-sm py-1 px-2 sm:px-4 text-center">
        {toUsd(order.totalCost)}
      </td>
    </tr>
  ));

  return (
    <table className="mb-8 mx-2">
      <thead>
        <tr>
          <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
            Order Id
          </th>
          <th className="border border-light-gray text-sm font-bold py-2 px-2 sm:px-4 text-center">
            Order Cost
          </th>
        </tr>
      </thead>
      <tbody>{ordersList}</tbody>
    </table>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      orderId: PropTypes.string.isRequired,
      totalCost: PropTypes.number.isRequired,
    })
  ).isRequired,
};
