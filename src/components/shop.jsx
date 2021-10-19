import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getAllItems } from "../helpers/db";
import ItemTile from "./shop/item_tile";

export default function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const result = await getAllItems();

      setItems(result);
    }

    getItems();
  }, []);

  const itemTiles = items.map((item) => <ItemTile item={item} key={item.docId} />);

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center px-2 pb-8">
      <div className="text-white bg-blue-primary -mx-2 py-6 self-stretch border-b border-gray-light mb-10">
        <h1 className="text-2xl text-center">What are you looking for today?</h1>
      </div>
      <div className="flex flex-wrap justify-center">{itemTiles}</div>
    </div>
  );
}
