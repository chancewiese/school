import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakGroupAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addStreakGroup({ name, description });
    navigate("/streak-groups");
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: theme.palette.primary.main }}
      >
        Add Streak Group
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Group
        </Button>
      </form>
    </Box>
  );
};

export default StreakGroupAdd;
