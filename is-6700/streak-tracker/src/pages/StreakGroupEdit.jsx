import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   TextField,
   Button,
   Box,
   Typography,
   CircularProgress,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakGroupEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();
   const [name, setName] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchGroup = async () => {
         try {
            setIsLoading(true);
            const group = await api.getStreakGroup(id);
            setName(group.name);
         } catch (error) {
            console.error("Error fetching group:", error);
            setError("Failed to load group data. Please try again.");
         } finally {
            setIsLoading(false);
         }
      };

      fetchGroup();
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await api.updateStreakGroup(id, { name });
         navigate("/streak-groups");
      } catch (error) {
         console.error("Error updating group:", error);
         setError("Failed to update group. Please try again.");
      }
   };

   const handleCancel = () => {
      navigate("/streak-groups");
   };

   if (isLoading) {
      return <CircularProgress />;
   }

   if (error) {
      return <Typography color="error">{error}</Typography>;
   }

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
            <Box
               sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
               <Button type="submit" variant="contained" color="primary">
                  Update Group
               </Button>
               <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
               >
                  Cancel
               </Button>
            </Box>
         </form>
      </Box>
   );
};

export default StreakGroupEdit;
