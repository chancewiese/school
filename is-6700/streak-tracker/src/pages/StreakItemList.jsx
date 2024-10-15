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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakItemList = () => {
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
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
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleMoveItem = async (itemId, newGroupId) => {
    try {
      await api.moveStreakItem(itemId, newGroupId);
      await fetchItems();
    } catch (error) {
      console.error("Error moving item:", error);
    }
  };

  const handleIncrementStreak = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item) {
        await api.updateStreakItem(id, {
          ...item,
          streak: item.streak + 1,
        });
        await fetchItems();
      }
    } catch (error) {
      console.error("Error incrementing streak:", error);
    }
  };

  const handleDecrementStreak = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item && item.streak > 0) {
        await api.updateStreakItem(id, {
          ...item,
          streak: item.streak - 1,
        });
        await fetchItems();
      }
    } catch (error) {
      console.error("Error decrementing streak:", error);
    }
  };

  const getGroupName = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return group ? group.name : "Unknown Group";
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    let comparison = 0;
    if (sortField === "streak") {
      comparison = a.streak - b.streak;
    } else if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "group") {
      comparison = getGroupName(a.groupId).localeCompare(
        getGroupName(b.groupId)
      );
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const SortButton = ({ field, label, width }) => (
    <Button
      onClick={() => handleSort(field)}
      startIcon={
        sortField === field ? (
          sortDirection === "asc" ? (
            <ArrowUpwardIcon />
          ) : (
            <ArrowDownwardIcon />
          )
        ) : null
      }
      sx={{ width: width, justifyContent: "flex-start" }}
    >
      {label}
    </Button>
  );

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          p: 2,
          mb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <SortButton field="streak" label="Streak" width="20%" />
        <SortButton field="name" label="Name" width="40%" />
        <SortButton field="group" label="Group" width="30%" />
        <Box sx={{ width: "10%" }} /> {/* Spacer for edit/delete icons */}
      </Box>
      <List
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": { borderBottom: "none" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "20%",
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                onClick={() => handleDecrementStreak(item.id)}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1, minWidth: "20px", textAlign: "center" }}>
                {item.streak}
              </Typography>
              <IconButton
                onClick={() => handleIncrementStreak(item.id)}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
            <ListItemText primary={item.name} sx={{ width: "40%" }} />
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
            <Box
              sx={{
                width: "10%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => navigate(`/streak-items/edit/${item.id}`)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(item.id)}
                size="small"
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
