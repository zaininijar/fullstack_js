import React from "react";
import PropTypes from "prop-types";

const Input = ({ placeholder, name, type = "text", onChange }) => {
  return (
    <input
      className="pl-2 outline-none border-none"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
};

Input.propTypes = {};

export default Input;
