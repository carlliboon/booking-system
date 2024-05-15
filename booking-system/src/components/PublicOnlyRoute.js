import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext"; // Adjust the import path as necessary

const PublicOnlyRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Check if the user is already logged in
  if (user && user.id) {
    // Redirect them to the courses page if they are logged in
    return <Navigate to="/courses" replace />;
  }

  // If the user is not logged in, allow them to access the route
  return children;
};

export default PublicOnlyRoute;
