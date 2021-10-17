import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Home = lazy(() => import("./pages/home"));
const Shop = lazy(() => import("./pages/shop"));
const Item = lazy(() => import("./pages/item"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Profile = lazy(() => import("./pages/profile"));

// Consider adding a NetworkError feature in the future.

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={ROUTES.SHOP} component={Shop} />
          <Route path={ROUTES.ITEM} component={Item} />
          <Route path={ROUTES.CART} component={Cart} />
          <Route path={ROUTES.CHECKOUT} component={Checkout} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.HOME} component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
