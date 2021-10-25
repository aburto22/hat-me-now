import { useState } from "react";
import { getCartItemsNum } from "../helpers/local_storage";

export default function useCartItems() {
  const [cartItemsNum, setCartItemsNum] = useState(getCartItemsNum());

  return { cartItemsNum, setCartItemsNum };
}
