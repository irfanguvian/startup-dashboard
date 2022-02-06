import React from "react";
import propTypes from "prop-types";

const Error = ({ children }) => {
  return (
    <div
      style={{
        fontSize: "80%",
        color: "#e55353",
        marginTop: "0.25rem",
      }}
    >
      {children}
    </div>
  );
};

Error.propTypes = {
  children: propTypes.any,
};

export default Error;
