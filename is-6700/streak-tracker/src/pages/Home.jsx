import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { api } from "../utils/api";
import HomeLogoComponent from "../components/HomeLogoComponent";

const Home = () => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <HomeLogoComponent />
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body1" gutterBottom>
          Welcome to Streak Tracker
        </Typography>
        <Typography variant="body2">
          You have {groups.length} streak groups and {items.length} streak
          items.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
