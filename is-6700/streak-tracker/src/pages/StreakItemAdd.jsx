import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
   TextField,
   Button,
   Select,
   MenuItem,
   FormControl,
   InputLabel,
   Box,
   Typography,
} from "@mui/material";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";
import { useForm } from "../contexts/FormContext";

const StreakItemAdd = () => {
   const navigate = useNavigate();
   const theme = useTheme();
   const { handleSubmit, register, errors } = useForm();
   const [groups, setGroups] = useState([]);

   useEffect(() => {
      api.getStreakGroups().then(setGroups);
   }, []);

   const onSubmit = async (data) => {
      await api.addStreakItem(data);
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
               {...register("name", { required: "Name is required" })}
               label="Name"
               fullWidth
               required
               margin="normal"
               error={!!errors.name}
               helperText={errors.name?.message}
            />
            <FormControl fullWidth margin="normal">
               <InputLabel>Streak Group</InputLabel>
               <Select
                  {...register("groupId", { required: "Group is required" })}
                  label="Streak Group"
                  error={!!errors.groupId}
               >
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
         </form>
      </Box>
   );
};

export default StreakItemAdd;
