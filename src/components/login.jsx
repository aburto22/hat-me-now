import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Form from "./login/form";

export default function Login() {
  return (
    <main className="h-full flex items-center justify-center text-gray-primary">
      <div className="bg-white border p-3 mr-8 hidden tablet:block h-104">
        <img src="/images/general/kid-with-hat-small.jpg" alt="Kid with a hat" className="h-full" />
      </div>
      <div className="bg-white border border-gray-light px-4 py-6 max-w-xs flex-grow tablet:h-104 flex flex-col justify-center">
        <h1 className="mb-4 text-center font-bold text-xl my-auto">Login</h1>
        <Form />
        <p className="text-sm text-center mt-auto">Don`t have an account?</p>
        <p className="text-sm text-center mb-auto">
          <Link
            to={ROUTES.SIGN_UP}
            className="text-blue-primary font-bold hover:text-blue-hover"
            aria-label="Go to sign-up page"
          >
            Click here to register.
          </Link>
        </p>
      </div>
    </main>
  );
}
