import React from "react";

export default function Main() {
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-light flex flex-col items-center text-gray-primary">
      <div className="self-stretch border-b border-gray-light relative mb-10">
        <img
          src="/images/general/main-hat.jpg"
          alt="Woman with hat in swimming pool"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bg-white bg-opacity-50 top-1/4 w-full py-4">
          <h1 className="text-xl text-center font-light text-black">Welcome!</h1>
        </div>
      </div>
      <div className="flex flex-col items-center max-w-sm mx-auto py-10 sm:py-14 border-b border-gray-light self-stretch px-2">
        <p className="text-center mb-2 italic max-w-xs font-light">
          This is <span className="text-blue-primary font-bold not-italic">Hat me Now</span>, the
          most trendy and fashionable hat store you will ever going to find.
        </p>
        <p className="text-center mb-2 italic max-w-xs font-light">
          Do you fancy a hat? Come into the store and take a look at our amazing range of hats.
        </p>
        <p className="text-center mb-2 italic max-w-xs font-light">
          You don&rsquo;t need a hat? Come in as well and we are sure you will find something you
          like.
        </p>
        <p className="text-center font-light">Happy shopping!</p>
      </div>
      <img
        src="/images/general/woman-with-hat-bw.jpg"
        alt="Black and white woman with hat"
        className="w-full"
      />
    </div>
  );
}
