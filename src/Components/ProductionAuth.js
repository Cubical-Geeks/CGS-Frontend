import React from "react";
import { Navigate } from "react-router-dom";

const ProductionAuth = (Component) => {
  return (props) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/ProductionLogin" />;
    }
    return <Component {...props} />;
  };
};

export default ProductionAuth;
