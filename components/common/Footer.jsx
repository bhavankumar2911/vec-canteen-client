import React from "react";
import Heart from "../icons/Heart";

function Footer() {
  return (
    <div className="text-sm text-center py-5">
      Made with{" "}
      <span className="text-red-500 inline-block translate-y-1">
        <Heart />
      </span>{" "}
      by{" "}
      <a
        href="https://www.instagram.com/bhavan29_/"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        Bhavan,{" "}
      </a>
      <a
        href="https://www.instagram.com/_k.u.r.a.l_/"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        Kural,{" "}
      </a>
      and{" "}
      <a
        href="https://www.instagram.com/sha_kt_hi_071/"
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        Shakthi
      </a>
    </div>
  );
}

export default Footer;
