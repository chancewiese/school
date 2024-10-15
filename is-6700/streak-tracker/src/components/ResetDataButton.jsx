import React from "react";
import { Button } from "@mui/material";
import { api } from "../utils/api";

const ResetDataButton = () => {
  const handleReset = () => {
    api.clearAllData().then(() => {
      console.log("All data cleared");
      // Optionally, you can reload the page or update the app state
      window.location.reload();
    });
  };

  // Only render in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Button variant="contained" color="secondary" onClick={handleReset}>
      Reset All Data (Dev Only)
    </Button>
  );
};

export default ResetDataButton;
