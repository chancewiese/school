import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const AdminToggleButton = ({ isAdminView, setIsAdminView }) => {
   const { isAdmin } = useAuth();

   if (!isAdmin()) {
      return null;
   }

   return (
      <Button
         variant="contained"
         color="primary"
         onClick={() => setIsAdminView(!isAdminView)}
         sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 1000,
            textTransform: "none",
         }}
      >
         {isAdminView ? "Toggle to User View" : "Toggle to Admin View"}
      </Button>
   );
};

export default AdminToggleButton;
