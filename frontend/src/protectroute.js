import React from "react";
import './protectroute.css'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h2>You must be logged in to access this page.</h2>;
  }

  return children;
}

export default ProtectedRoute;
