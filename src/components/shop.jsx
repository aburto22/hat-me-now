import React, { useState, useEffect } from "react";
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
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center pb-8 text-gray-primary">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/shop-hat-large.jpg"
          srcSet="/images/general/shop-hat-large.jpg 900w, /images/general/shop-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
          alt="Woman with hat with flower"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light text-black">
            What are you looking for today?
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center px-2">{itemTiles}</div>
    </div>
  );
}
