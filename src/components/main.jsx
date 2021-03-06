import React from "react";
import PropTypes from "prop-types";
import FlashMessage from "./common/flash_message";

export default function Main({ message }) {
  return (
    <main className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center text-gray-primary relative">
      {message.length > 0 && <FlashMessage message={message} />}
      <div className="self-stretch relative">
        <img
          src="/images/general/main-hat-large.jpg"
          srcSet="/images/general/main-hat-large.jpg 900w, /images/general/main-hat-small.jpg 640w"
          sizes="min(900px, 100vw)"
          alt="Woman with hat in swimming pool"
          className="w-full h-48 object-cover border-b border-gray-light mb-6"
        />
        <div className="absolute bg-white bg-opacity-90 top-1/4 w-full py-4">
          <h1 className="text-xl text-center">Welcome!</h1>
        </div>
      </div>
      <div className="flex flex-col items-center max-w-sm mx-auto py-10 mobile:py-14 mb-6 self-stretch px-2">
        <p className="text-center mb-2 italic max-w-xs">
          This is <span className="text-blue-primary font-bold not-italic">Hat me Now</span>, the
          most trendy and fashionable hat store you will ever find.
        </p>
        <p className="text-center mb-2 italic max-w-xs">
          Do you fancy a hat? Come into the store and take a look at our amazing range of hats.
        </p>
        <p className="text-center mb-2 italic max-w-xs">
          You don&rsquo;t need a hat? Come in as well and we are sure you will find something you
          like.
        </p>
        <p className="text-center">Happy shopping!</p>
      </div>
      <img
        src="/images/general/woman-with-hat-bw-large.jpg"
        srcSet="/images/general/woman-with-hat-bw-large.jpg 900w, /images/general/woman-with-hat-bw-small.jpg 640w"
        sizes="min(900px, 100vw)"
        alt="Black and white woman with hat"
        className="w-full"
      />
    </main>
  );
}

Main.propTypes = {
  message: PropTypes.string,
};

Main.defaultProps = {
  message: "",
};
