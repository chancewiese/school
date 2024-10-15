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

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { handleSubmit, register, errors } = useForm();
  const [registerError, setRegisterError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, isAdmin);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setRegisterError(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
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
          autoComplete="new-password"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              name="isAdmin"
            />
          }
          label="Register as Admin"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      {registerError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {registerError}
        </Alert>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
