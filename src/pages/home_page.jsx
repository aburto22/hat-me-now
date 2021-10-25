import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";

export default function HomePage({ location: { state } }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state) {
      setMessage(state?.message);
    }
  }, [state?.message]);

  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header setMessage={setMessage} />
      <Main message={message} />
      <Footer />
    </div>
  );
}

HomePage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
};

HomePage.defaultProps = {
  location: {
    state: {
      message: "",
    },
  },
};
