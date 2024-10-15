import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
   const [authState, setAuthState] = useState({
      error: null,
      isAuthenticated: false,
      isLoading: true,
      user: null,
   });

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const user = await api.getCurrentUser();
            console.log("Current user:", user);
            setAuthState({
               error: null,
               isAuthenticated: true,
               isLoading: false,
               user,
            });
         } catch (error) {
            console.error("Error checking auth:", error);
            setAuthState({
               error: null,
               isAuthenticated: false,
               isLoading: false,
               user: null,
            });
         }
      };
      checkAuth();
   }, []);

   const login = async (email, password) => {
      try {
         const user = await api.login(email, password);
         console.log("Logged in user:", user);
         setAuthState({
            error: null,
            isAuthenticated: true,
            isLoading: false,
            user,
         });
      } catch (error) {
         console.error("Login error:", error);
         setAuthState({
            error: error.message,
            isAuthenticated: false,
            isLoading: false,
            user: null,
         });
         throw error;
      }
   };

   const logout = async () => {
      try {
         await api.logout();
         setAuthState({
            error: null,
            isAuthenticated: false,
            isLoading: false,
            user: null,
         });
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   const isAdmin = () => {
      console.log("Checking isAdmin, user:", authState.user);
      return authState.user?.isAdmin || false;
   };

   const value = {
      ...authState,
      login,
      logout,
      isAdmin,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
