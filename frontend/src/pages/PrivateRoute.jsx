import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/user_context";

const PrivateRoute = ({ children }) => {
  const { token } = useUserContext();
  if (!token) {
    return <Navigate to="/login/?redirect=/checkout" />;
  }
  return children;
};

export default PrivateRoute;
