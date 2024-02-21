import React from "react";
import { Navigate } from "react-router-dom";

const SalesAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/SalesLogin" />;
    }
    return <Component {...props} />;
  };
};

export default SalesAuth;
