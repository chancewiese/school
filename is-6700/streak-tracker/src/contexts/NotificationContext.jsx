import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "@mui/material";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
   const [notification, setNotification] = useState(null);

   const showNotification = (message, severity = "info") => {
      setNotification({ message, severity });
   };

   const hideNotification = () => {
      setNotification(null);
   };

   return (
      <NotificationContext.Provider value={{ showNotification }}>
         {children}
         <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={hideNotification}
            message={notification?.message}
            severity={notification?.severity}
         />
      </NotificationContext.Provider>
   );
};
