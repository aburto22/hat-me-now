/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { getAllItems } from "../../helpers/db";
import ItemTile from "./item_tile";

export default function AllItemsTiles() {
  const [items, setItems] = useState(Array(6).fill(0));
  useEffect(() => {
    async function getItems() {
      const result = await getAllItems();

      setItems(result);
    }

    getItems();
  }, []);

  const itemTiles = items.map((item, i) =>
    item ? (
      <ItemTile item={item} key={item.docId} />
    ) : (
      <div className="animate-pulse m-2 h-80 w-60 flex flex-col items-center" key={i}>
        <div className="w-full mb-4 h-32 bg-gray-skeleton" />
        <div className="mx-3 mb-4 font-bold bg-gray-skeleton h-6 w-28 rounded" />
        <div className="border-b border-gray-light pb-3 mb-3 h-24 w-full mx-3 flex items-center justify-center">
          <div className="bg-gray-skeleton h-20 w-44 rounded" />
        </div>
        <div className="mx-3 font-bold text-center mb-8 bg-gray-skeleton h-6 w-20 rounded" />
      </div>
    )
  );

  return <div className="flex flex-wrap justify-center px-2">{itemTiles}</div>;
}