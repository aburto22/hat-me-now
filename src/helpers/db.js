import {
  getFirestore,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { firebase } from "../services/firebase";

// Creates an user in both auth and DB spaces. if user is successfully created, return an object with the userId. if not, return an object with the error message
export async function addUserToDb(userId, email) {
  const db = getFirestore(firebase);
  await setDoc(doc(db, "users", userId), {
    emailAddress: email,
    userId,
  });
}

export async function getAllItems() {
  const db = getFirestore(firebase);
  const itemsRaw = await getDocs(collection(db, "items"));

  return itemsRaw.docs.map((item) => ({ ...item.data(), docId: item.id }));
}

export async function getItemById(itemId) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "items"), where("itemId", "==", itemId));
  const itemRaw = await getDocs(q);
  const item = itemRaw.docs.map((it) => ({ ...it.data(), docId: it.id }));

  return item.length > 0 ? item[0] : null;
}

export async function getCartByUserId(userId) {
  const db = getFirestore(firebase);
  const q = query(collection(db, "carts"), where("userId", "==", userId));
  const cartRaw = await getDocs(q);
  const cart = cartRaw.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return cart.length > 0 ? cart[0] : null;
}

export async function addItemToCart(userId, newItem) {
  const db = getFirestore(firebase);
  const cart = await getCartByUserId(userId);

  const index = cart.items.findIndex((item) => item.itemId === newItem.itemId);

  // Check qty in stock is superior to qty of items user has on cart.
  const itemInfo = await getItemById(newItem.itemId);

  if (index >= 0) {
    if (cart.items[index].qty + newItem.qty >= itemInfo.qty) {
      cart.items[index].qty = itemInfo.qty;
    } else {
      cart.items[index].qty += newItem.qty;
    }
  } else {
    cart.items = [...cart.items, newItem];
  }

  await setDoc(doc(db, "carts", cart.docId), cart);

  return [...cart.items];
}

export async function addOrderToUser(userId, cart) {
  return Promise.all(
    cart.map(async (item) => {
      const itemInfo = await getItemById(item.itemId);

      return { ...item, price: itemInfo.price };
    })
  ).then(async (result) => {
    const db = getFirestore(firebase);

    const totalCost = result.reduce((sum, item) => sum + item.qty * item.price, 0);

    const order = { items: result, totalCost, userId };

    const docRef = await addDoc(collection(db, "orders"), order);

    await updateDoc(doc(db, "orders", docRef.id), {
      orderId: docRef.id,
    });

    return docRef.id;
  });
}

export async function getUserById(userId) {
  const db = getFirestore(firebase);

  const q = query(collection(db, "users"), where("userId", "==", userId));
  const userRaw = await getDocs(q);

  const userArray = userRaw.docs.map((user) => ({ ...user.data(), docId: user.id }));

  return userArray.length > 0 ? userArray[0] : null;
}

export async function getOrdersByUserId(userId) {
  const db = getFirestore(firebase);

  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const ordersRaw = await getDocs(q);

  const ordersArray = ordersRaw.docs.map((order) => ({ ...order.data(), docId: order.id }));

  return ordersArray;
}

export async function getOrderById(orderId) {
  const db = getFirestore(firebase);

  const orderRaw = await getDoc(doc(db, "orders", orderId));

  return orderRaw.data();
}
