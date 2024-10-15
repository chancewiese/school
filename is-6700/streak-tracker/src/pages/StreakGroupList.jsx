import React, { useState, useEffect } from "react";
import {
   List,
   ListItem,
   ListItemText,
   IconButton,
   Button,
   Typography,
   Box,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

const StreakGroupList = () => {
   const [groups, setGroups] = useState([]);
   const [openDialog, setOpenDialog] = useState(false);
   const [dialogMessage, setDialogMessage] = useState("");
   const theme = useTheme();
   const navigate = useNavigate();
   const { isAdmin } = useAuth();

   useEffect(() => {
      api.getStreakGroups().then(setGroups);
   }, []);

   const handleDelete = async (id) => {
      if (!isAdmin()) {
         setDialogMessage("You do not have permission for this action.");
         setOpenDialog(true);
         return;
      }
      try {
         await api.deleteStreakGroup(id);
         setGroups(groups.filter((group) => group.id !== id));
      } catch (error) {
         console.error("Error deleting group:", error);
      }
   };

   const handleEdit = (id) => {
      if (!isAdmin()) {
         setDialogMessage("You do not have permission for this action.");
         setOpenDialog(true);
      } else {
         navigate(`/streak-groups/edit/${id}`);
      }
   };

   const handleCloseDialog = () => {
      setOpenDialog(false);
   };

   const isGeneralGroup = (group) => {
      return group.id === "general" || group.name.toLowerCase() === "general";
   };

   return (
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               mb: 2,
            }}
         >
            <Typography
               variant="h4"
               component="h1"
               sx={{ color: theme.palette.primary.main }}
            >
               Streak Groups
            </Typography>
            <Button component={Link} to="/" variant="outlined" color="primary">
               Home
            </Button>
         </Box>
         {isAdmin() && (
            <Button
               component={Link}
               to="/streak-groups/add"
               variant="contained"
               color="primary"
               sx={{ mb: 2 }}
            >
               Add New Group
            </Button>
         )}
         <List
            sx={{
               bgcolor: theme.palette.background.paper,
               borderRadius: 1,
               overflow: "hidden",
            }}
         >
            {groups.map((group) => (
               <ListItem
                  key={group.id}
                  secondaryAction={
                     !isGeneralGroup(group) &&
                     isAdmin() && (
                        <Box>
                           <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEdit(group.id)}
                           >
                              <EditIcon />
                           </IconButton>
                           <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDelete(group.id)}
                           >
                              <DeleteIcon />
                           </IconButton>
                        </Box>
                     )
                  }
                  sx={{
                     borderBottom: `1px solid ${theme.palette.divider}`,
                     "&:last-child": { borderBottom: "none" },
                  }}
               >
                  <ListItemText primary={group.name} />
               </ListItem>
            ))}
         </List>
         <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Unauthorized Action</DialogTitle>
            <DialogContent>
               <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDialog} color="primary">
                  Okay
               </Button>
            </DialogActions>
         </Dialog>
      </Box>
   );
};

export default StreakGroupList;
