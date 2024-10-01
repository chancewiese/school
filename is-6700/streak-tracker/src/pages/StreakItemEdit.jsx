import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
   TextField,
   Button,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
   Box,
   Typography,
   Container,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";

const StreakItemEdit = () => {
   const [name, setName] = useState("");
   const [groupId, setGroupId] = useState("");
   const [streak, setStreak] = useState(0);
   const [groups, setGroups] = useState([]);
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [item, fetchedGroups] = await Promise.all([
               api.getStreakItem(id),
               api.getStreakGroups(),
            ]);
            setName(item.name);
            setGroupId(item.groupId);
            setStreak(item.streak);
            setGroups(fetchedGroups);
         } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error (e.g., show error message to user)
         }
      };
      fetchData();
   }, [id]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         await api.updateStreakItem(id, { name, groupId, streak });
         navigate("/streak-items");
      } catch (error) {
         console.error("Error updating streak item:", error);
         // Handle error (e.g., show error message to user)
      }
   };

   return (
      <Container maxWidth="sm">
         <Box
            sx={{
               p: 3,
               backgroundColor: theme.palette.background.default,
               borderRadius: theme.shape.borderRadius,
               boxShadow: theme.shadows[3],
               mt: 4,
            }}
         >
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
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                     mt: 2,
                     backgroundColor: theme.palette.primary.main,
                     "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                     },
                  }}
               >
                  Update Item
               </Button>
            </form>
         </Box>
      </Container>
   );
};

export default StreakItemEdit;
