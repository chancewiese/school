import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AdminComponent = () => {
   const { isAdmin } = useAuth();

   if (!isAdmin()) {
      return <div>You do not have permission to view this page.</div>;
   }

   return (
      <div>
         <h1>Admin Dashboard</h1>
         {/* Add admin-only content here */}
      </div>
   );
};

export default AdminComponent;
