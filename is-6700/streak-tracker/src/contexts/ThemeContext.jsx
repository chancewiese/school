import React, { createContext, useContext, useState } from "react";
import {
   ThemeProvider as MuiThemeProvider,
   createTheme,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
   const [mode, setMode] = useState("light");

   const toggleTheme = () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
   };

   const theme = React.useMemo(
      () =>
         createTheme({
            palette: {
               mode,
            },
         }),
      [mode]
   );

   return (
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
         <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
   );
};
