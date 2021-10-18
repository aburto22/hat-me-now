import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Form from "./login/form";

export default function Login() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white border p-3 rounded mr-8 hidden md:block">
        <img src="/images/general/kid-with-hat.jpg" alt="Kid with a hat" className="max-h-96" />
      </div>
      <div className="bg-white border border-gray-light px-4 py-6 max-w-xs flex-grow">
        <h1 className="mb-4 text-center font-bold text-xl">Login</h1>
        <Form />
        <p className="text-sm text-gray-primary text-center">Don`t have an account?</p>
        <p className="text-sm text-gray-primary text-center">
          Click{" "}
          <Link to={ROUTES.SIGN_UP} className="text-blue-primary font-bold hover:text-blue-hover">
            here
          </Link>{" "}
          to register.
        </p>
      </div>
    </div>
  );
}
