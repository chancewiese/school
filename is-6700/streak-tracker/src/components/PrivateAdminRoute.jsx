import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateAdminRoute = ({ children }) => {
   const { isAuthenticated, user } = useAuth();
   return isAuthenticated && user?.isAdmin ? children : <Navigate to="/" />;
};
