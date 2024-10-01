import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakGroupList = () => {
  const [groups, setGroups] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    api.getStreakGroups().then(setGroups);
  }, []);

  const handleDelete = async (id) => {
    await api.deleteStreakGroup(id);
    setGroups(groups.filter((group) => group.id !== id));
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
          Streak Groups
        </Typography>
        <Button component={Link} to="/" variant="outlined" color="primary">
          Home
        </Button>
      </Box>
      <Button
        component={Link}
        to="/streak-groups/add"
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add New Group
      </Button>
      <List
        sx={{
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {groups.map((group) => (
          <ListItem
            key={group.id}
            secondaryAction={
              <Box>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  component={Link}
                  to={`/streak-groups/edit/${group.id}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(group.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <ListItemText primary={group.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StreakGroupList;
