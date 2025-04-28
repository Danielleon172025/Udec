import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search, Download, Group } from "@mui/icons-material";
import axios from "axios";
import Banner from "../../components/banner/banner";
import AssignUsersModal from "./AssignUserToProfileModal"; 

const colors = {
  primaryGreen: "#007B3E",
  darkGreen: "#00482B",
};

const ProfileList = ({ setShowForm, setEditingProfile }) => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [assigningProfile, setAssigningProfile] = useState(null);

  const fetchProfiles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profiles`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfiles(response.data);
    } catch (error) {
      console.error(" Error al cargar perfiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const toggleProfileStatus = async (IdProfile, isActive) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/profiles/${IdProfile}`,
        { IsActive: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfiles((prev) =>
        prev.map((p) =>
          p.IdProfile === IdProfile ? { ...p, IsActive: !isActive } : p
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Ocurrió un error al cambiar el estado del Perfil.");
    }
  };

  const exportToCSV = () => {
    const data = profiles.map((p) => ({
      ID: p.IdProfile,
      Nombre: p.Name,
      Descripción: p.Description,
      Estado: p.IsActive ? "Activo" : "Inactivo",
    }));

    const csv = [
      "ID,Nombre,Descripción,Estado",
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Perfiles.csv";
    link.click();
  };

  const columns = [
    { field: "IdProfile", headerName: "ID", width: 80 },
    { field: "Name", headerName: "Nombre", width: 200 },
    { field: "Description", headerName: "Descripción", width: 300 },
    {
      field: "IsActive",
      headerName: "Estado",
      width: 120,
      renderCell: ({ value }) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: value ? "green" : "gray",
            color: "white",
            borderRadius: "20px",
            padding: "2px 12px",
            textTransform: "none",
          }}
        >
          {value ? "Activo" : "Inactivo"}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 240,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditingProfile(row);
              setShowForm(true);
            }}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: row.IsActive ? "red" : "green",
              color: "#fff",
              borderRadius: 2,
            }}
            onClick={() => toggleProfileStatus(row.IdProfile, row.IsActive)}
          >
            {row.IsActive ? "Inactivar" : "Activar"}
          </Button>
          {/* Botón para abrir modal de usuarios asignados */}
          {<IconButton onClick={() => setAssigningProfile(row)}>
            <Group />
          </IconButton> }
        </Box>
      ),
    },
  ];

  const filteredProfiles = profiles.filter((p) =>
    `${p.Name} ${p.Description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Banner />

      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión de Perfiles
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Buscar perfiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ maxWidth: 300 }}
            InputProps={{ startAdornment: <Search /> }}
          />

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setEditingProfile(null);
                setShowForm(true);
              }}
              sx={{
                backgroundColor: colors.primaryGreen,
                "&:hover": { backgroundColor: colors.darkGreen },
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
                "&:hover": { backgroundColor: colors.darkGreen },
              }}
            >
              Exportar
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={filteredProfiles}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.IdProfile}
          autoHeight
        />
      </Paper>

      {/*  Modal de asignación de usuarios */}
      { 
        <AssignUsersModal 
          open={!!assigningProfile} 
          profile={assigningProfile} 
          onClose={() => setAssigningProfile(null)} 
        /> 
      }
    </Container>
  );
};

export default ProfileList;
