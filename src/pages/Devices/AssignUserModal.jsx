import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, List, ListItem, ListItemText, CircularProgress, Typography
} from "@mui/material";
import axios from "axios";

const AssignUserModal = ({ open, onClose, device }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignedUser, setAssignedUser] = useState(null);

  const token = localStorage.getItem("token");

  //  Buscar usuarios disponibles ( funcion autocompletar)
  const fetchUsers = async (term = "") => {
    setIsLoadingUsers(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user-devices/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: term }
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error buscando usuarios:", err);
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  //  Obtener usuario ya asignado al dispositivo
  const fetchAssignedUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user-devices/${device.DeviceId}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignedUser(Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null);
    } catch (err) {
      console.error("Error obteniendo asignación:", err);
    }
  };

  useEffect(() => {
    if (open && device) {
      fetchUsers();
      fetchAssignedUser();
    }
  }, [open, device]);

  //  Asignar usuario
  const assignUser = async (userId) => {
    setIsAssigning(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/user-devices/assign`, {
        userId,
        deviceId: device.DeviceId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Usuario asignado correctamente.");
      fetchAssignedUser(); // Refrescar asignación
    } catch (err) {
      console.error("Error asignando usuario:", err);
      alert("Error asignando usuario.");
    } finally {
      setIsAssigning(false);
    }
  };

  //  Remover asignación
  const unassignUser = async () => {
    if (!window.confirm("¿Estás seguro de eliminar esta asignación?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user-devices/unassign/${device.DeviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAssignedUser(null);
      alert("Asignación eliminada.");
    } catch (err) {
      console.error("Error eliminando asignación:", err);
      alert("Error eliminando asignación.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Asignar Usuario a: {device?.Serial}</DialogTitle>
      <DialogContent dividers>
        {assignedUser ? (
          <div style={{ marginBottom: "1rem" }}>
            <Typography variant="subtitle2" color="text.secondary">
              Usuario asignado:
            </Typography>
            <Typography>
              {assignedUser.Username} ({assignedUser.Email})
            </Typography>
            <Button color="error" onClick={unassignUser} size="small" sx={{ mt: 1 }}>
              Quitar asignación
            </Button>
          </div>
        ) : (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Este dispositivo no tiene usuario asignado.
          </Typography>
        )}

        <TextField
          label="Buscar usuario..."
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            fetchUsers(value);
          }}
          sx={{ mb: 2 }}
        />

        {isLoadingUsers ? (
          <CircularProgress />
        ) : (
          <List dense>
            {Array.isArray(users) && users.map((user) => (
              <ListItem
                key={user.UserId}
                button
                onClick={() => assignUser(user.UserId)}
                disabled={isAssigning || assignedUser?.UserId === user.UserId}
              >
                <ListItemText primary={`${user.Username} (${user.Email})`} />
              </ListItem>
            ))}
            {!users.length && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                No se encontraron usuarios.
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignUserModal;
