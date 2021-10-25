import React, { useContext, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import UserContext from "../context/user_context";
import * as SVG from "./svg/svgs";
import CartContext from "../context/cart_context";

export default function Header() {
  const user = useContext(UserContext);
  const { cartItemsNum } = useContext(CartContext);
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
      <li>
        <NavLink
          to={ROUTES.PROFILE}
          className="nav-link-collapse"
          activeClassName="active-nav-link-collapse"
        >
          Profile
        </NavLink>
      </li>
      <li>
        <button type="button" className="nav-link-collapse" onClick={handleLogout}>
          Log out
        </button>
      </li>
    </>
  ) : (
    <>
      <li className="p-0 m-0">
        <NavLink
          to={ROUTES.LOGIN}
          className="nav-link-collapse"
          activeClassName="active-nav-link-collapse"
        >
          Login
        </NavLink>
      </li>
      <li className="p-0 m-0">
        <NavLink
          to={ROUTES.SIGN_UP}
          className="nav-link-collapse"
          activeClassName="active-nav-link-collapse"
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white text-gray-primary h-16 mb-8 border-b border-gray-mid">
      <nav className="max-w-4xl mx-auto p-2 relative">
        <ul className="flex items-center">
          <li>
            <NavLink
              exact
              to={ROUTES.HOME}
              aria-label="Home"
              className="nav-link"
              activeClassName="active-nav-link"
            >
              <SVG.Home className="h-7 w-7 sm:h-5 sm:w-5 sm:mr-1" />
              <span className="hidden sm:block">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.SHOP}
              aria-label="Shop"
              className="nav-link"
              activeClassName="active-nav-link"
            >
              <SVG.Shop className="h-7 w-7 sm:h-5 sm:w-5 sm:mr-1" />
              <span className="hidden sm:block">Shop</span>
            </NavLink>
          </li>
          <li className="ml-auto">
            <NavLink
              to={ROUTES.CART}
              aria-label="cart"
              className="nav-link relative"
              activeClassName="active-nav-link"
            >
              <SVG.Cart className="h-7 w-7 sm:h-5 sm:w-5 sm:mr-1" />
              <span className="hidden sm:block">Cart</span>
              {cartItemsNum > 0 && (
                <div className="bg-blue-primary p-1 rounded-full text-white text-xs h-4 w-4 flex items-center justify-center absolute left-0 top-1">
                  {cartItemsNum}
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <button
              aria-label="open menu"
              type="button"
              onClick={handleToggle}
              className="mt-2 px-1 sm:hidden hover:text-blue-hover"
            >
              <SVG.Menu className="h-8 w-8" />
            </button>
          </li>
          <li>
            <ul
              className={`fixed right-0 top-0 h-screen bg-white w-3/4 z-20 ${
                navCollapseShown ? "flex" : "hidden"
              } flex-col items-center justify-center border-l border-gray-light sm:flex sm:h-auto sm:w-auto sm:static sm:border-0 sm:flex-row`}
            >
              <li>
                <button
                  type="button"
                  className="absolute top-0 right-0 my-4 mx-3 hover:text-blue-hover sm:hidden"
                  onClick={handleToggle}
                  aria-label="close menu"
                >
                  <SVG.Close className="h-7 w-7" />
                </button>
              </li>
              {userMenu}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
