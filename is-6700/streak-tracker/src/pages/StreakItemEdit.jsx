import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   TextField,
   Button,
   Box,
   Typography,
   CircularProgress,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakItemEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();
   const [name, setName] = useState("");
   const [groupId, setGroupId] = useState("");
   const [streak, setStreak] = useState(0);
   const [groups, setGroups] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            setIsLoading(true);
            console.log("Fetching data for item id:", id);
            const [item, fetchedGroups] = await Promise.all([
               api.getStreakItem(id),
               api.getStreakGroups(),
            ]);

            console.log("Fetched item:", item);
            console.log("Fetched groups:", fetchedGroups);

            if (item) {
               setName(item.name || "");
               setGroupId(item.groupId || "");
               setStreak(item.streak || 0);
            } else {
               throw new Error("Item not found");
            }

            if (Array.isArray(fetchedGroups)) {
               setGroups(fetchedGroups);
            } else {
               throw new Error("Invalid groups data received");
            }
         } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load item data. Please try again.");
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await api.updateStreakItem(id, { name, groupId, streak });
         navigate("/streak-items");
      } catch (error) {
         console.error("Error updating item:", error);
         setError("Failed to update item. Please try again.");
      }
   };

   const handleCancel = () => {
      navigate("/streak-items");
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
            Edit Streak Item
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
            <FormControl fullWidth margin="normal">
               <InputLabel>Streak Group</InputLabel>
               <Select
                  value={groupId}
                  label="Streak Group"
                  onChange={(e) => setGroupId(e.target.value)}
                  required
               >
                  {groups.map((group) => (
                     <MenuItem key={group.id} value={group.id}>
                        {group.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <TextField
               label="Current Streak"
               type="number"
               value={streak}
               onChange={(e) => setStreak(Number(e.target.value))}
               fullWidth
               margin="normal"
               InputProps={{ inputProps: { min: 0 } }}
            />
            <Box
               sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
               <Button type="submit" variant="contained" color="primary">
                  Update Item
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

export default StreakItemEdit;
