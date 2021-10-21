/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import UserContext from "../context/user_context";
import * as ROUTES from "../constants/routes";

export default function OnlyPublicRoute({ Component, ...restOfProps }) {
  const userId = useContext(UserContext);

  return (
    <Route
      {...restOfProps}
      render={(props) => (userId ? <Redirect to={ROUTES.HOME} /> : <Component {...props} />)}
    />
  );
}

OnlyPublicRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
