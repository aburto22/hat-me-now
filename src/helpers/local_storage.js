import { getItemById } from "./db";

export async function addItemToCart(itemId, qty) {
  let cart = localStorage.getItem("cart");

  if (!cart) {
    cart = [];
  } else {
    cart = JSON.parse(cart);
  }

  const index = cart.findIndex((it) => it.itemId === itemId);

  const itemInfo = await getItemById(itemId);

  if (index >= 0) {
    if (cart[index].qty + qty >= itemInfo.qty) {
      cart[index].qty = itemInfo.qty;
    } else {
      cart[index].qty += qty;
    }
  } else {
    cart.push({ itemId, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
}

export function removeItemFromCart(itemId) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const index = cart.findIndex((it) => it.itemId === itemId);

  if (index >= 0) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
}

export function getCartItemsNum() {
  let cart = localStorage.getItem("cart");

  if (!cart || cart?.length < 3) {
    return 0;
  }

  cart = JSON.parse(cart);

  return cart.reduce((sum, item) => sum + item.qty, 0);
}
