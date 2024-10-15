import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HomeLogoComponent = () => {
   const theme = useTheme();

   return (
      <Box sx={{ textAlign: "center", mb: 4 }}>
         <Box
            className="fire"
            sx={{
               position: "relative",
               width: "100px",
               height: "100px",
               backgroundColor: "transparent",
               margin: "0 auto",
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
            }}
         >
            Streak Tracker
         </Typography>
      </Box>
   );
};

export default HomeLogoComponent;
