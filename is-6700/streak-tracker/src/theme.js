import { createTheme } from "@mui/material/styles";

const theme = createTheme({
   palette: {
      primary: {
         main: "#D13620", // Red as the primary color
         light: "#E15A47", // Lighter shade of red
         dark: "#B02E1B", // Darker shade of red
      },
      secondary: {
         main: "#FF6B6B", // A different shade of red for secondary
         light: "#FF8E8E", // Lighter shade of secondary red
         dark: "#CC5555", // Darker shade of secondary red
      },
      background: {
         default: "#FFF5EF", // Very light orange for background
         paper: "#FFFFFF", // White for paper elements
      },
      text: {
         primary: "#D13620", // Red for primary text
         secondary: "#FF6B6B", // Secondary red for secondary text
      },
   },
   typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
         fontSize: "2.5rem",
         fontWeight: 500,
         color: "#D13620", // Red for headers
      },
      h2: {
         fontSize: "2rem",
         fontWeight: 500,
         color: "#B02E1B", // Slightly darker red for subheaders
      },
      button: {
         textTransform: "none", // Prevents automatic uppercase transformation
      },
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               borderRadius: 8, // Rounded corners for buttons
            },
            containedPrimary: {
               backgroundColor: "#D13620", // Red for primary buttons
               "&:hover": {
                  backgroundColor: "#B02E1B", // Darker red on hover
               },
            },
            containedSecondary: {
               backgroundColor: "#FF6B6B", // Secondary red for secondary buttons
               "&:hover": {
                  backgroundColor: "#CC5555", // Darker secondary red on hover
               },
            },
         },
      },
      MuiAppBar: {
         styleOverrides: {
            root: {
               backgroundColor: "#D13620", // Red for AppBar
            },
         },
      },
   },
});

export default theme;
