import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakItemList = () => {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  const fetchItems = useCallback(async () => {
    try {
      const fetchedItems = await api.getStreakItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, []);

  const fetchGroups = useCallback(async () => {
    try {
      const fetchedGroups = await api.getStreakGroups();
      setGroups(fetchedGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchGroups();
  }, [fetchItems, fetchGroups]);

  const handleDelete = async (id) => {
    try {
      await api.deleteStreakItem(id);
      await fetchItems(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleMoveItem = async (itemId, newGroupId) => {
    try {
      await api.moveStreakItem(itemId, newGroupId);
      await fetchItems(); // Refresh the list after moving
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  const handleIncrementStreak = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item) {
        await api.updateStreakItem(id, { ...item, streak: item.streak + 1 });
        await fetchItems(); // Refresh the list after updating
      }
    } catch (error) {
      console.error("Error incrementing streak:", error);
    }
  };

  const handleDecrementStreak = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item && item.streak > 0) {
        await api.updateStreakItem(id, { ...item, streak: item.streak - 1 });
        await fetchItems(); // Refresh the list after updating
      }
    } catch (error) {
      console.error("Error decrementing streak:", error);
    }
  };

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : "Unknown Group";
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: theme.palette.primary.main }}
        >
          Streak Items
        </Typography>
        <Button component={Link} to="/" variant="outlined" color="primary">
          Home
        </Button>
      </Box>
      <Button
        component={Link}
        to="/streak-items/add"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add New Item
      </Button>
      <List
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {items.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": { borderBottom: "none" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "30%" }}>
              <IconButton onClick={() => handleDecrementStreak(item.id)}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.streak}</Typography>
              <IconButton onClick={() => handleIncrementStreak(item.id)}>
                <AddIcon />
              </IconButton>
              <ListItemText primary={item.name} sx={{ ml: 2 }} />
            </Box>
            <Select
              value={item.groupId}
              onChange={(e) => handleMoveItem(item.id, e.target.value)}
              sx={{ width: "30%" }}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
            <Box>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => navigate(`/streak-items/edit/${item.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StreakItemList;
