import React from "react";
import PropTypes from "prop-types";

const Input = ({ placeholder, name, type = "text", onChange, id = ""}) => {
  return (
    <input
      className="pl-2 outline-none border-none w-full"
      type={type}
      placeholder={placeholder}
      name={name} 
      id={id}
      onChange={onChange}
    />
  );
};

Input.propTypes = {};

export default Input;
