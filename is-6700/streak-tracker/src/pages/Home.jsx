import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import HomeLogoComponent from "../components/HomeLogoComponent";
import { api } from "../utils/api";
import ResetDataButton from "../components/ResetDataButton";

const Home = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedGroups, fetchedItems] = await Promise.all([
        api.getStreakGroups(),
        api.getStreakItems(),
      ]);
      setGroups(fetchedGroups);
      setItems(fetchedItems);
    };
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      {/* User info and logout button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {user.email}
        </Typography>
        <Button onClick={logout} variant="outlined" size="small">
          Logout
        </Button>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HomeLogoComponent />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button
            component={Link}
            to="/streak-groups"
            variant="contained"
            color="primary"
          >
            Streak Groups
          </Button>
          <Button
            component={Link}
            to="/streak-items"
            variant="contained"
            color="secondary"
          >
            Streak Items
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Welcome to Streak Tracker
          </Typography>
          <Typography variant="body2">
            You have {groups.length} streak groups and {items.length} streak
            items.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
