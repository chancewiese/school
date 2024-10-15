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
import AdminRoute from "./components/AdminRoute"; // Import the AdminRoute component

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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
                      <PrivateRoute>
                        <StreakGroupAdd />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/streak-groups/edit/:id"
                    element={
                      <PrivateRoute>
                        <StreakGroupEdit />
                      </PrivateRoute>
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
                      <PrivateRoute>
                        <StreakItemAdd />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/streak-items/edit/:id"
                    element={
                      <PrivateRoute>
                        <StreakItemEdit />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Container>
            </Router>
          </FormProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
