import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import UserContext from "../context/user_context";

export default function Header() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [navCollapseShown, setNavCollapseShown] = useState(false);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      // TODO pass error message to error page.
      console.error(error.message, error.code);
      history.push(ROUTES.ERROR);
    });
  }

  function handleToggle() {
    setNavCollapseShown((state) => !state);
  }

  const userMenu = user ? (
    <>
      <NavLink
        to={ROUTES.PROFILE}
        className="border-b border-gray-primary py-2 px-2 mx-2 text-center hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
      >
        Profile
      </NavLink>
      <button
        type="button"
        className="border-b border-gray-primary py-2 px-2 mx-2 text-center hover:border-blue-hover hover:text-blue-hover text-sm font-light uppercase"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  ) : (
    <>
      <NavLink to={ROUTES.LOGIN} className="nav-link">
        Login
      </NavLink>
      <NavLink to={ROUTES.SIGN_UP} className="nav-link">
        Register
      </NavLink>
    </>
  );

  return (
    <div className="bg-white text-gray-primary h-16 mb-8 border-b border-gray-light">
      <div className="max-w-screen-lg mx-auto flex items-center p-2 relative">
        <NavLink to={ROUTES.HOME} className="nav-link">
          Home
        </NavLink>
        <NavLink to={ROUTES.SHOP} className="nav-link">
          Shop
        </NavLink>
        <div className="ml-auto relative">
          <button
            type="button"
            onClick={handleToggle}
            className="absolute -top-3 right-4 sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={`fixed right-0 top-0 h-screen bg-white w-3/4 z-20 ${
              navCollapseShown ? "flex" : "hidden"
            } flex-col justify-center items-center border-l border-gray-light sm:flex sm:flex-row sm:h-auto sm:w-auto sm:static sm:border-0`}
          >
            <button
              type="button"
              className="absolute top-0 right-0 my-3 mx-5 sm:hidden"
              onClick={handleToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 font-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {userMenu}
          </div>
        </div>
      </div>
    </div>
  );
}
