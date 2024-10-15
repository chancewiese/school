import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "../contexts/FormContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { handleSubmit, register, errors } = useForm();
  const [loginError, setLoginError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password, isAdmin);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", { required: "Email is required" })}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              name="isAdmin"
            />
          }
          label="Login as Admin"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      {loginError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {loginError}
        </Alert>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
