import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakItemAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    api.getStreakGroups().then(setGroups);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addStreakItem({ name, description, groupId });
    navigate("/streak-items");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        Add Streak Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Streak Group</InputLabel>
          <Select
            value={groupId}
            label="Streak Group"
            onChange={(e) => setGroupId(e.target.value)}
            required
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      </form>
    </Box>
  );
};

export default StreakItemAdd;
