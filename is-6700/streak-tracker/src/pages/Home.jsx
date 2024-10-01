import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <HomeLogoComponent groupCount={groups.length} itemCount={items.length} />
    </Box>
  );
};

export default Home;
