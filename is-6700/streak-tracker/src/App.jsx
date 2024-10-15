import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Home from "./pages/Home";
import StreakGroupList from "./pages/StreakGroupList";
import StreakGroupAdd from "./pages/StreakGroupAdd";
import StreakGroupEdit from "./pages/StreakGroupEdit";
import StreakItemList from "./pages/StreakItemList";
import StreakItemAdd from "./pages/StreakItemAdd";
import StreakItemEdit from "./pages/StreakItemEdit";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FormProvider } from "./contexts/FormContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import AdminToggleButton from "./components/AdminToggleButton";

const PrivateRoute = ({ children }) => {
   const { isAuthenticated } = useAuth();
   console.log("PrivateRoute - isAuthenticated:", isAuthenticated);
   return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
   const { isAuthenticated, isAdmin } = useAuth();
   console.log(
      "AdminRoute - isAuthenticated:",
      isAuthenticated,
      "isAdmin:",
      isAdmin()
   );
   if (!isAuthenticated) return <Navigate to="/login" replace />;
   return isAdmin() ? children : <Navigate to="/" replace />;
};

function App() {
   return (
      <AuthProvider>
         <ThemeProvider theme={theme}>
            <NotificationProvider>
               <FormProvider>
                  <Router>
                     <CssBaseline />
                     <Container>
                        <Routes>
                           <Route path="/login" element={<LoginPage />} />
                           <Route path="/register" element={<RegisterPage />} />
                           <Route
                              path="/"
                              element={
                                 <PrivateRoute>
                                    <Home />
                                 </PrivateRoute>
                              }
                           />
                           <Route
                              path="/streak-groups"
                              element={
                                 <PrivateRoute>
                                    <StreakGroupList />
                                 </PrivateRoute>
                              }
                           />
                           <Route
                              path="/streak-groups/add"
                              element={
                                 <AdminRoute>
                                    <StreakGroupAdd />
                                 </AdminRoute>
                              }
                           />
                           <Route
                              path="/streak-groups/edit/:id"
                              element={
                                 <AdminRoute>
                                    <StreakGroupEdit />
                                 </AdminRoute>
                              }
                           />
                           <Route
                              path="/streak-items"
                              element={
                                 <PrivateRoute>
                                    <StreakItemList />
                                 </PrivateRoute>
                              }
                           />
                           <Route
                              path="/streak-items/add"
                              element={
                                 <AdminRoute>
                                    <StreakItemAdd />
                                 </AdminRoute>
                              }
                           />
                           <Route
                              path="/streak-items/edit/:id"
                              element={
                                 <AdminRoute>
                                    <StreakItemEdit />
                                 </AdminRoute>
                              }
                           />
                        </Routes>
                        <AdminToggleButton />
                     </Container>
                  </Router>
               </FormProvider>
            </NotificationProvider>
         </ThemeProvider>
      </AuthProvider>
   );
}

export default App;
