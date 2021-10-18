import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export async function createUserAuth(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const userId = userCredentials.user.uid;

      return { userId };
    })
    .catch((err) => ({
      error: err.message,
    }));
}

export async function getCurrentUser() {
  return "1234";
}
