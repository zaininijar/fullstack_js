import React from "react";
import PropTypes from "prop-types";

const FormControl = ({ children }) => {
  return (
    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
      {children}
    </div>
  );
};

FormControl.propTypes = {};

export default FormControl;
