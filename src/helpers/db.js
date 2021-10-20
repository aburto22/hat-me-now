import { getFirestore, setDoc, doc, collection, getDocs, where, query } from "firebase/firestore";
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

  cart.items = [...cart.items, newItem];

  await setDoc(doc(db, "carts", cart.docId), cart);

  return [...cart.items];
}
