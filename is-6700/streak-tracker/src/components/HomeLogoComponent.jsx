import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const HomeLogoComponent = ({ groupCount, itemCount }) => {
  const theme = useTheme();

  return (
    <Box
      className="flex flex-col items-center"
      sx={{ height: "100vh", maxWidth: "400px", margin: "80px", padding: 2 }}
    >
      <Box
        className="fire"
        sx={{
          position: "relative",
          width: "100px",
          height: "100px",
          backgroundColor: "transparent",
          marginBottom: 2,
          "& .main-fire": {
            backgroundColor: theme.palette.primary.main,
            filter: `drop-shadow(0 0 10px ${theme.palette.primary.dark})`,
          },
          "& .particle-fire": {
            backgroundColor: theme.palette.primary.light,
            filter: `drop-shadow(0 0 10px ${theme.palette.primary.dark})`,
          },
          "& .fire-bottom .main-fire": {
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <Box className="fire-left">
          <Box className="main-fire"></Box>
          <Box className="particle-fire"></Box>
        </Box>
        <Box className="fire-center">
          <Box className="main-fire"></Box>
          <Box className="particle-fire"></Box>
        </Box>
        <Box className="fire-right">
          <Box className="main-fire"></Box>
          <Box className="particle-fire"></Box>
        </Box>
        <Box className="fire-bottom">
          <Box className="main-fire"></Box>
        </Box>
      </Box>

      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        Streak Tracker
      </Typography>

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
          You have {groupCount} streak groups and {itemCount} streak items.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeLogoComponent;
