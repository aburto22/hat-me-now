import { getFirestore, setDoc, doc, collection, getDocs } from "firebase/firestore";
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

  const items = itemsRaw.docs.map((item) => ({ ...item.data(), docId: item.id }));

  return items;
}
