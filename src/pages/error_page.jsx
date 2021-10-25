import React from "react";
import PropTypes from "prop-types";
import Header from "../components/header";

export default function ErrorPage({
  location: {
    state: { message, code },
  },
}) {
  return (
    <div className="bg-gray-body bg-body-pattern min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <h1 className="text-3xl mx-2 mb-4 font-bold text-center">Error</h1>
        <p className="text-xl mx-2 mb-4 font-bold text-center">
          Looks like there was an error with your request. You can try again later.
        </p>
        <p className="text-l mx-2 mb-1 font-bold text-center">Error code: {code}</p>
        <p className="text-l mx-2 font-bold text-center">Error message: {message}</p>
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      message: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
