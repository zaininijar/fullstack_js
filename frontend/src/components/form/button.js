import React from "react";
import PropTypes from "prop-types";

const Button = ({children, type = "button"}) => {
  return (
    <button
      type={type}
      className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
    >
      {children}
    </button>
  );
};

Button.propTypes = {};

export default Button;
