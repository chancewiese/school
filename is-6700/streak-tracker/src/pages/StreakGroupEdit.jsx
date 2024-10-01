import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakGroupEdit = () => {
   const [name, setName] = useState("");
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();

   useEffect(() => {
      api.getStreakGroup(id).then((group) => {
         setName(group.name);
      });
   }, [id]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      await api.updateStreakGroup(id, { name });
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
            Edit Streak Group
         </Typography>
         <form onSubmit={handleSubmit}>
            <TextField
               label="Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
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
               Update Group
            </Button>
         </form>
      </Box>
   );
};

export default StreakGroupEdit;
