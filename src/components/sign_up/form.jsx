import React, { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("confirmation: ", confirmation);
    setEmail("");
    setPassword("");
    setConfirmation("");
  }

  return (
    <form className="flex flex-col mb-4" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="email">
          <span className="text-xs font-bold text-gray-primary block mb-1">E-mail:</span>
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
      <div className="mb-4">
        <label htmlFor="password">
          <span className="text-xs font-bold text-gray-primary block mb-1">Password:</span>
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
      <div className="mb-4">
        <label htmlFor="confirmation">
          <span className="text-xs font-bold text-gray-primary block mb-1">
            Password confirmation:
          </span>
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
        className="bg-blue-primary text-white py-2 px-4 rounded hover:bg-blue-hover"
      >
        Login
      </button>
    </form>
  );
}
