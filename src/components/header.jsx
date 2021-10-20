import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import UserContext from "../context/user_context";

export default function Header() {
  const user = useContext(UserContext);
  const history = useHistory();

  function handleClick() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      // TODO pass error message to error page.
      console.error(error.message, error.code);
      history.push(ROUTES.ERROR);
    });
  }

  const userMenu = user ? (
    <>
      <NavLink
        to={ROUTES.PROFILE}
        className="border-b border-gray-primary py-2 px-2 mr-4 ml-auto hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
      >
        Profile
      </NavLink>
      <button
        type="button"
        className="border-b border-gray-primary py-2 px-2 hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
        onClick={handleClick}
      >
        Log out
      </button>
    </>
  ) : (
    <>
      <NavLink
        to={ROUTES.LOGIN}
        className="border-b border-gray-primary py-2 px-2 ml-auto mr-4 hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
      >
        Login
      </NavLink>
      <NavLink
        to={ROUTES.SIGN_UP}
        className="border-b border-gray-primary py-2 px-2 hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
      >
        Register
      </NavLink>
    </>
  );

  return (
    <div className="bg-white text-gray-primary h-16 mb-8 border-b border-gray-light">
      <div className="max-w-screen-lg mx-auto flex items-center p-2">
        <NavLink
          to={ROUTES.HOME}
          className="border-b border-gray-primary py-2 px-2 mr-4 hover:border-blue-primary hover:text-blue-primary text-sm font-light uppercase"
        >
          Home
        </NavLink>
        <NavLink
          to={ROUTES.SHOP}
          className="border-b border-gray-primary py-2 px-2 mr-4 hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
        >
          Shop
        </NavLink>
        {userMenu}
      </div>
    </div>
  );
}
