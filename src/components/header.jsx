import React, { useContext, useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import * as ROUTES from "../constants/routes";
import UserContext from "../context/user_context";
import * as SVG from "./svg/svgs";
import CartContext from "../context/cart_context";

export default function Header({ setMessage = null }) {
  const user = useContext(UserContext);
  const { cartItemsNum } = useContext(CartContext);
  const history = useHistory();
  const [navCollapseShown, setNavCollapseShown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setNavCollapseShown(false);
  }, []);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        if (location.pathname !== "/") {
          history.push(ROUTES.HOME, { message: "You have successfully logged-out." });
        } else {
          setNavCollapseShown(false);
          setMessage("You have successfully logged-out.");
        }
      })
      .catch((err) => {
        history.push(ROUTES.ERROR, { message: err.message, code: err.code });
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
              <SVG.Home className="h-7 w-7 mobile:h-5 mobile:w-5 mobile:mr-1" />
              <span className="hidden mobile:block">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.SHOP}
              aria-label="Shop"
              className="nav-link"
              activeClassName="active-nav-link"
            >
              <SVG.Shop className="h-7 w-7 mobile:h-5 mobile:w-5 mobile:mr-1" />
              <span className="hidden mobile:block">Shop</span>
            </NavLink>
          </li>
          <li className="ml-auto">
            <NavLink
              to={ROUTES.CART}
              aria-label="cart"
              className="nav-link relative"
              activeClassName="active-nav-link"
            >
              <SVG.Cart className="h-7 w-7 mobile:h-5 mobile:w-5 mobile:mr-1" />
              <span className="hidden mobile:block">Cart</span>
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
              className="mt-2 px-1 mobile:hidden hover:text-blue-hover"
            >
              <SVG.Menu className="h-8 w-8" />
            </button>
          </li>
          <li>
            <ul
              className={`fixed left-full top-0 h-screen bg-white w-3/4 z-20 ${
                navCollapseShown && "transform -translate-x-full"
              } transition-transform flex flex-col items-center justify-center border-l border-gray-light mobile:transition-none mobile:transform-none mobile:h-auto mobile:w-auto mobile:static mobile:border-0 mobile:flex-row`}
            >
              <li>
                <button
                  type="button"
                  className="absolute top-0 right-0 my-4 mx-3 hover:text-blue-hover mobile:hidden"
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

Header.propTypes = {
  setMessage: PropTypes.func,
};

Header.defaultProps = {
  setMessage: null,
};
