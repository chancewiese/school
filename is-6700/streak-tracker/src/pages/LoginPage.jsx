import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useForm, useInput } from "../contexts/FormContext";

const LoginPage = () => {
   const navigate = useNavigate();
   const { login } = useAuth();
   const { handleSubmit } = useForm();
   const [loginError, setLoginError] = useState(null);

   const emailInput = useInput("email");
   const passwordInput = useInput("password");

   const onSubmit = async (data) => {
      try {
         await login(data.email, data.password);
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
               {...emailInput}
               label="Email"
               fullWidth
               margin="normal"
               required
            />
            <TextField
               {...passwordInput}
               label="Password"
               type="password"
               fullWidth
               margin="normal"
               required
               autoComplete="current-password"
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
