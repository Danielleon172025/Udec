import React, { useState, useEffect } from "react";
import Banner from "../../components/banner/banner"; 
import { Container, Paper, Typography, TextField, Button, IconButton, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search, Download } from "@mui/icons-material";
import axios from "axios";

const colors = {
  primaryGreen: "#007B3E",
  darkGreen: "#00482B",
  lightGreen: "#79C000",
  yellow: "#FBE122",
};

const UserList = ({ setShowForm, setEditingUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No se encontró un token en localStorage");

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error al cargar los Usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserStatus = async (UserId, isActive) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No se encontró un token. Por favor, inicia sesión.");

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/users/${UserId}`,
        { IsActive: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.UserId === UserId ? { ...user, IsActive: !isActive } : user
        )
      );
      alert("Estado del Usuario actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el estado del Usuario:", error);
      alert("Ocurrió un error al cambiar el estado del Usuario.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const exportToCSV = () => {
    const csvData = users.map((user) => ({
      ID: user.UserId,
      Nombre: user.Firstname,
      Apellido: user.Lastname,
      Usuario: user.Username,
      Correo: user.Email,
      Estado: user.IsActive ? "Activo" : "Inactivo",
    }));

    const csvHeaders = ["ID", "Nombre", "Apellido", "Usuario", "Correo", "Estado"];
    const csvContent =
      csvHeaders.join(",") +
      "\n" +
      csvData.map((row) => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter((user) =>
    `${user.Username} ${user.Lastname} ${user.Email} ${user.Username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "UserId", headerName: "ID", width: 70 },
    { field: "Firstname", headerName: "Nombre", width: 100 },
    { field: "Lastname", headerName: "Apellido", width: 100 },
    { field: "Username", headerName: "Usuario", width: 100 },
    { field: "Email", headerName: "Correo", width: 200 },
    {
      field: "IsActive",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: params.value ? "green" : "gray",
            color: "white",
            fontWeight: "bold",
            borderRadius: "20px",
            padding: "5px 15px",
          }}
        >
          {params.value ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "20px",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: params.row.IsActive ? "red" : "green",
              "&:hover": {
                backgroundColor: params.row.IsActive ? "#c62828" : "#2e7d32",
              },
              color: "white",
              borderRadius: "20px",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
            onClick={() => toggleUserStatus(params.row.UserId, params.row.IsActive)}
          >
            {params.row.IsActive ? "Inactivar" : "Activar"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Agregar el Banner aquí */}
      <Banner />

      {/* 📋 Tabla de usuarios */}
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión de Usuarios
        </Typography>

        {/* 🔎 Barra de búsqueda y botones */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Buscar Usuarios..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            InputProps={{
              startAdornment: <Search />,
            }}
            sx={{ maxWidth: 300 }}
          />
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primaryGreen,
                fontFamily: "Century Gothic, Lato, sans-serif",
                "&:hover": { backgroundColor: colors.darkGreen },
              }}
              startIcon={<Add />}
              onClick={() => {
                setEditingUser(null);
                setShowForm(true);
              }}
            >
              Crear
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={exportToCSV}
              sx={{
                backgroundColor: colors.primaryGreen,
                fontFamily: "Century Gothic, Lato, sans-serif",
                "&:hover": { backgroundColor: colors.darkGreen },
              }}
            >
              Exportar
            </Button>
          </Box>
        </Box>

        {/* DataGrid con lista de usuarios */}
        <DataGrid 
          rows={filteredUsers} 
          columns={columns} 
          pageSize={10} 
          getRowId={(row) => row.UserId} 
        />
      </Paper>
    </Container>
  );
};

export default UserList;
