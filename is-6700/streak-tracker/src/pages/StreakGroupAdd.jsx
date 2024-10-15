import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";
import { useForm, useInput } from "../contexts/FormContext";

const StreakGroupAdd = () => {
   const navigate = useNavigate();
   const theme = useTheme();
   const { handleSubmit } = useForm();

   const nameInput = useInput("name");

   const onSubmit = async (data) => {
      await api.addStreakGroup(data);
      navigate("/streak-groups");
   };

   const handleCancel = () => {
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
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               {...nameInput}
               label="Name"
               fullWidth
               required
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
            <Button
               variant="contained"
               color="secondary"
               sx={{ mt: 2, ml: 2 }}
               onClick={handleCancel}
            >
               Cancel
            </Button>
         </form>
      </Box>
   );
};

export default StreakGroupAdd;
