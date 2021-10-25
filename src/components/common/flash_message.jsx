import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as SVG from "../svg/svgs";

export default function FlashMessage({ message }) {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    setIsShowing(true);
  }, [message]);

  return (
    <div
      className={`${
        isShowing ? "flex" : "hidden"
      } absolute top-2 z-10 bg-green-200 bg-opacity-90 rounded-lg border border-green-600 flex-grow`}
    >
      <p className=" py-2 border-r border-green-600 px-4">{message}</p>
      <button
        className="px-2 block"
        type="button"
        onClick={() => setIsShowing(false)}
        aria-label="close"
      >
        <SVG.CloseSimple className="h-4 w-4 block" />
      </button>
    </div>
  );
}

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
