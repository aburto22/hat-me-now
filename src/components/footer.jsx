import React from "react";
import * as SVG from "./svg/svgs";

export default function Footer() {
  return (
    <footer className="mt-8 pb-8 text-gray-primary flex items-center justify-center flex-wrap">
      <p className="text-xs text-center w-full mb-1">Created by Alejandro Aburto S.</p>
      <a
        href="https://github.com/aburto22/"
        aria-label="My Git Hub Profile"
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg focus:ring-2 focus:ring-gray-primary focus:outline-none"
      >
        <SVG.GitHub className="h-6 w-6 m-1" />
      </a>
      <a
        href="mailto:aburto22@gmail.com"
        aria-label="Send me an email"
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg focus:ring-2 focus:ring-gray-primary focus:outline-none"
      >
        <SVG.Mail className="h-8 w-8" />
      </a>
    </footer>
  );
}
