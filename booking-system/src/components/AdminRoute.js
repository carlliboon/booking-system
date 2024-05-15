import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext"; // Adjust the import path as necessary

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Check if the user exists and if the user is an admin
  if (!user || !user.isAdmin) {
    // Redirect them to the courses page if they are not an admin
    return <Navigate to="/courses" replace />;
  }

  // If the user is an admin, allow them to access the route
  return children;
};

export default AdminRoute;
