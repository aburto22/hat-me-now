import React, { useContext, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import UserContext from "../context/user_context";

export default function Header() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [navCollapseShown, setNavCollapseShown] = useState(false);

  useEffect(() => {
    setNavCollapseShown(false);
  }, []);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => history.push(ROUTES.HOME))
      .catch(() => {
        // TODO pass error message to error page.
        // console.error(error.message, error.code);
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
        className="border-b border-gray-primary py-2 px-2 mx-2 text-center hover:border-blue-hover hover:text-blue-hover text-sm uppercase font-light-normal"
        activeClassName="active-nav-link"
      >
        Profile
      </NavLink>
      <button
        type="button"
        className="border-b border-gray-primary py-2 px-2 mx-2 text-center hover:border-blue-hover hover:text-blue-hover text-sm uppercase font-light-normal"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  ) : (
    <>
      <NavLink to={ROUTES.LOGIN} className="nav-link" activeClassName="active-nav-link">
        Login
      </NavLink>
      <NavLink to={ROUTES.SIGN_UP} className="nav-link" activeClassName="active-nav-link">
        Register
      </NavLink>
    </>
  );

  return (
    <div className="bg-white text-gray-primary h-16 mb-8 border-b border-gray-light">
      <div className="max-w-4xl mx-auto flex items-center p-2 relative">
        <NavLink exact to={ROUTES.HOME} className="nav-link" activeClassName="active-nav-link">
          Home
        </NavLink>
        <NavLink to={ROUTES.SHOP} className="nav-link" activeClassName="active-nav-link">
          Shop
        </NavLink>
        <div className="ml-auto flex items-center">
          <NavLink
            to={ROUTES.CART}
            aria-label="cart"
            className="py-2 px-2 mx-2 hover:border-blue-hover hover:text-blue-hover text-sm font-light-normal uppercase text-center sm:border-b sm:border-gray-primary flex items-center"
            activeClassName="active-nav-link sm:border-blue-primary-light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-5 sm:w-5 sm:mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="hidden sm:block">Cart</span>
          </NavLink>
          <div className="relative ml-auto">
            <button
              aria-label="open menu"
              type="button"
              onClick={handleToggle}
              className="mt-2 mr-4 sm:hidden hover:text-blue-hover"
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
                  strokeWidth="1"
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
                className="absolute top-0 right-0 my-3 mx-5 sm:hidden hover:text-blue-hover"
                onClick={handleToggle}
                aria-label="close menu"
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
                    strokeWidth="1"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              {userMenu}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
