import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

export default function useAuthListener() {
  const [user, setUser] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (result) => {
      if (result) {
        setUser(result.uid);
        localStorage.setItem("userId", result.uid);
      } else {
        setUser(null);
        localStorage.removeItem("userId");
      }
    });

    return () => authListener;
  }, []);

  return user;
}
