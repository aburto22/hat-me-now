import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUserAuth } from "../../helpers/auth";
import { addUserToDb } from "../../helpers/db";
import * as ROUTES from "../../constants/routes";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const btnActive = email.length > 0 && password.length > 0 && confirmation.length > 0;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setError("Insert valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }
    const newUser = await createUserAuth(email, password);

    if (newUser.error) {
      setError(newUser.error);
      return;
    }

    await addUserToDb(newUser.userId, email);

    setError("");
    setEmail("");
    setPassword("");
    setConfirmation("");

    // TODO send message to login page letting user know account has been created and he can login now.

    history.push(ROUTES.HOME, {});
  }

  return (
    <form className="flex flex-col mb-4" onSubmit={handleSubmit}>
      {error && <p className="font-bold text-sm text-red-500 text-center mb-2">{error}</p>}
      <div className="mb-2 mt-2">
        <label htmlFor="email">
          <span className="text-xs font-bold block mb-1">E-mail:</span>
          <input
            type="email"
            placeholder="my@email.com"
            name="email"
            required
            aria-label="password"
            className="rounded px-2 py-1 w-full border border-gray-light"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div className="mb-2">
        <label htmlFor="password">
          <span className="text-xs font-bold block mb-1">Password:</span>
          <input
            type="password"
            placeholder="********"
            name="password"
            required
            aria-label="password"
            className="rounded px-2 py-1 w-full border border-gray-light"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div className="mb-6">
        <label htmlFor="confirmation">
          <span className="text-xs font-bold block mb-1">Password confirmation:</span>
          <input
            type="password"
            placeholder="********"
            name="confirmation"
            required
            aria-label="password confirmation"
            className="rounded px-2 py-1 w-full border border-gray-light"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
          />
        </label>
      </div>
      <button
        type="submit"
        className={`${!btnActive && "cursor-default"} ${
          btnActive ? "bg-blue-primary" : "bg-blue-disabled"
        } text-white py-2 px-4 rounded ${btnActive && "hover:bg-blue-hover"}`}
        disabled={!btnActive}
      >
        Sign up
      </button>
    </form>
  );
}
