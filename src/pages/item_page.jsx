import React from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Item from "../components/item";
import Footer from "../components/footer";

export default function ItemPage({ location: { state } }) {
  const from = state?.from ? state.from : "";

  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <Item from={from} />
      <Footer />
    </div>
  );
}

ItemPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }),
};

ItemPage.defaultProps = {
  location: {
    state: {
      from: "",
    },
  },
};
