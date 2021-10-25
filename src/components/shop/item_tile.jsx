import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import toUsd from "../../helpers/money";

export default function ItemTile({ item }) {
  const defaultDescription =
    "An amazing hat. You need to get it NOW! Seriously, who won't fancy a hat like this? You definitely do.";

  return (
    <Link
      to={`/item/${item.itemId}`}
      className="w-64 bg-white flex flex-col cursor hover:border border-4 border-white hover:border-gray-light items-stretch m-2"
    >
      <div className="w-full mb-4">
        <img
          src={`/images/items/${item.name.toLowerCase()}.jpg`}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
      </div>
      <h2 className="mx-3 text-center mb-2 text-blue-primary font-bold">{item.name}</h2>
      <div className="border-b border-gray-light pb-3 mb-3 h-24 w-auto mx-3 flex items-center">
        <p className="text-sm italic text-center w-44 mx-auto">
          {item.description ? item.description : defaultDescription}
        </p>
      </div>
      <p className="mx-3 font-bold text-center mb-8">{toUsd(item.price)}</p>
    </Link>
  );
}

ItemTile.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
    itemId: PropTypes.string.isRequired,
  }).isRequired,
};
