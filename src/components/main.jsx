import React from "react";

export default function Main() {
  return (
    <div className="max-w-screen-md mx-auto bg-white border border-gray-light flex flex-col items-center px-2 pb-8">
      <div className="text-white bg-blue-primary -mx-2 py-6 self-stretch border-b border-gray-light mb-4">
        <h1 className="text-2xl text-center">Welcome!</h1>
      </div>
      <div className="flex flex-col items-center max-w-sm pt-6 pb-10 mb-6 border-b borber-gray-light">
        <p className="text-center mb-2 italic max-w-xs">
          This is <span className="text-blue-primary font-bold not-italic">Hat me Now</span>, the
          most trendy and fashionable hat store you will ever going to find.
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
      <div className="p-3 border border-gray-light rounded">
        <img
          src="/images/general/woman-with-hat-bw.jpg"
          alt="Black and white woman with hat"
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
}
