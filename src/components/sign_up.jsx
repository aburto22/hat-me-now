import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Form from "./sign_up/form";

export default function Login() {
  return (
    <main className="h-full flex items-center justify-center text-gray-primary">
      <div className="bg-white border p-3 mr-8 hidden tablet:block h-104">
        <img src="/images/general/kid-with-hat-small.jpg" alt="Kid with a hat" className="h-full" />
      </div>
      <div className="bg-white border border-gray-light px-4 py-6 max-w-xs flex-grow h-104 flex flex-col justify-center">
        <h1 className="mb-4 text-center font-bold text-xl">Sign Up</h1>
        <Form />
        <p className="text-sm text-center mt-auto">Already have an account?</p>
        <p className="text-sm text-center">
          <Link to={ROUTES.LOGIN} className="text-blue-primary font-bold hover:text-blue-hover">
            Click here to login.
          </Link>
        </p>
      </div>
    </main>
  );
}
