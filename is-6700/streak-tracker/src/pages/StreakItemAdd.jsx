import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
   TextField,
   Button,
   Box,
   Typography,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";
import { useForm, useInput } from "../contexts/FormContext";

const StreakItemAdd = () => {
   const [groups, setGroups] = useState([]);
   const navigate = useNavigate();
   const theme = useTheme();
   const { handleSubmit } = useForm();

   const nameInput = useInput("name");
   const groupIdInput = useInput("groupId");

   useEffect(() => {
      api.getStreakGroups().then((fetchedGroups) => {
         setGroups(fetchedGroups);
         if (fetchedGroups.length > 0) {
            groupIdInput.onChange({ target: { value: fetchedGroups[0].id } });
         }
      });
   }, []);

   const onSubmit = async (data) => {
      await api.addStreakItem(data);
      navigate("/streak-items");
   };

   const handleCancel = () => {
      navigate("/streak-items");
   };

   return (
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
         <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
         >
            Add Streak Item
         </Typography>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
               {...nameInput}
               label="Name"
               fullWidth
               required
               margin="normal"
            />
            <FormControl fullWidth margin="normal">
               <InputLabel>Streak Group</InputLabel>
               <Select {...groupIdInput} label="Streak Group" required>
                  {groups.map((group) => (
                     <MenuItem key={group.id} value={group.id}>
                        {group.name}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Button
               type="submit"
               variant="contained"
               color="primary"
               sx={{ mt: 2 }}
            >
               Add Item
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

export default StreakItemAdd;
