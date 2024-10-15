import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
   const { isAuthenticated, isAdmin } = useAuth();

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return isAdmin() ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
