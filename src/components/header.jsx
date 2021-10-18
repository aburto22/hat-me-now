import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Header() {
  return (
    <div className="bg-white text-gray-primary h-16 mb-8 border-b border-gray-light">
      <div className="max-w-screen-lg mx-auto flex items-center p-2">
        <NavLink
          to={ROUTES.HOME}
          className="border-b border-gray-primary py-2 px-4 mr-2 hover:border-blue-primary hover:text-blue-primary"
        >
          Home
        </NavLink>
        <NavLink
          to={ROUTES.SHOP}
          className="border-b border-gray-primary py-2 px-4 mr-2 hover:border-blue-hover hover:text-blue-hover"
        >
          Shop
        </NavLink>
        <NavLink
          to={ROUTES.LOGIN}
          className="border-b border-gray-primary py-2 px-4 ml-auto mr-2 hover:border-blue-hover hover:text-blue-hover"
        >
          Login
        </NavLink>
        <NavLink
          to={ROUTES.SIGN_UP}
          className="border-b border-gray-primary py-2 px-4 mr-2 hover:border-blue-hover hover:text-blue-hover"
        >
          Register
        </NavLink>
        <NavLink
          to={ROUTES.PROFILE}
          className="border-b border-gray-primary py-2 px-4 mr-2 hover:border-blue-hover hover:text-blue-hover"
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
}
