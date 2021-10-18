import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user_context";
import useAuthListener from "./hooks/use_auth_listener";

const HomePage = lazy(() => import("./pages/home_page"));
const LoginPage = lazy(() => import("./pages/login_page"));
const SignUpPage = lazy(() => import("./pages/sign_up_page"));
const ShopPage = lazy(() => import("./pages/shop_page"));
const ItemPage = lazy(() => import("./pages/item_page"));
const CartPage = lazy(() => import("./pages/cart_page"));
const CheckoutPage = lazy(() => import("./pages/checkout_page"));
const ProfilePage = lazy(() => import("./pages/profile_page"));
const ErrorPage = lazy(() => import("./pages/error_page"));

// Consider adding a NetworkError feature in the future.

function App() {
  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={ROUTES.SHOP} component={ShopPage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.ITEM} component={ItemPage} />
          <Route path={ROUTES.CART} component={CartPage} />
          <Route path={ROUTES.CHECKOUT} component={CheckoutPage} />
          <Route path={ROUTES.PROFILE} component={ProfilePage} />
          <Route path={ROUTES.ERROR} component={ErrorPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
        </Switch>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
