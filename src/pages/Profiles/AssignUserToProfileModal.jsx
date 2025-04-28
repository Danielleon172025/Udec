import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
  Button,
  Typography,
  CircularProgress
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import axios from "axios";

const AssignUsersToProfileModal = ({ open, onClose, profile }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [assignedUserIds, setAssignedUserIds] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const [all, assigned] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.REACT_APP_API_URL}/api/profiles/${profile.IdProfile}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAllUsers(all.data);
      setAssignedUserIds(assigned.data.map((u) => u.UserId));
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && profile) {
      fetchUsers();
    }
  }, [open, profile]);

  const handleAssign = async (userId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users-profiles`, {
        userId,
        profileId: profile.IdProfile,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAssignedUserIds([...assignedUserIds, userId]);
    } catch (error) {
      console.error("Error asignando usuario:", error);
    }
  };

  const handleUnassign = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users-profiles/delete`, {
        params: { userId, profileId: profile.IdProfile },
        headers: { Authorization: `Bearer ${token}` },
      });

      setAssignedUserIds(assignedUserIds.filter((id) => id !== userId));
    } catch (error) {
      console.error("Error eliminando asignación:", error);
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    `${user.Username} ${user.Email}`.toLowerCase().includes(search.toLowerCase())
  );

  const availableUsers = filteredUsers.filter((u) => !assignedUserIds.includes(u.UserId));
  const assignedUsers = filteredUsers.filter((u) => assignedUserIds.includes(u.UserId));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Asignar Usuarios al Perfil</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Buscar usuario..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="subtitle1">Usuarios disponibles</Typography>
              <Paper sx={{ height: 300, overflow: "auto" }}>
                <List dense>
                  {availableUsers.map((user) => (
                    <ListItem
                      key={user.UserId}
                      secondaryAction={
                        <IconButton onClick={() => handleAssign(user.UserId)} color="primary">
                          <ArrowForward />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={`${user.Username} (${user.Email})`} />
                    </ListItem>
                  ))}
                  {!availableUsers.length && (
                    <Typography sx={{ p: 2 }} color="text.secondary">
                      No hay usuarios disponibles.
                    </Typography>
                  )}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h6">⇆</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="subtitle1">Usuarios asignados</Typography>
              <Paper sx={{ height: 300, overflow: "auto" }}>
                <List dense>
                  {assignedUsers.map((user) => (
                    <ListItem
                      key={user.UserId}
                      secondaryAction={
                        <IconButton onClick={() => handleUnassign(user.UserId)} color="error">
                          <ArrowBack />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={`${user.Username} (${user.Email})`} />
                    </ListItem>
                  ))}
                  {!assignedUsers.length && (
                    <Typography sx={{ p: 2 }} color="text.secondary">
                      No hay usuarios asignados.
                    </Typography>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignUsersToProfileModal;
