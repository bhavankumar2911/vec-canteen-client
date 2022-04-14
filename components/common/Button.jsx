import React from "react";

function Button({ type, text, classes }) {
  return (
    <button
      type={type}
      className={`bg-primary text-white w-full rounded-lg py-2 block font-semibold hover:bg-secondary outline-0 hover:text-primary ${classes}`}
    >
      {text}
    </button>
  );
}

export default Button;
