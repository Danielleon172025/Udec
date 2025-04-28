import React, { useState, useEffect } from "react";
import {
  Container, Paper, Typography, TextField, Button, IconButton, Box
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Search, Download, Edit, PersonAdd } from "@mui/icons-material";
import axios from "axios";
import Banner from "../../components/banner/banner";
import AssignUserModal from "./AssignUserModal"; 

const colors = {
  primaryGreen: "#007B3E",
  darkGreen: "#00482B",
};

const DeviceList = ({ setShowForm, setEditingDevice }) => {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);

  const fetchDevices = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/devices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDevices(response.data);
    } catch (error) {
      console.error("Error al cargar dispositivos:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const toggleDeviceStatus = async (DeviceId, isActive) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/devices/${DeviceId}`, {
        IsActive: !isActive,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDevices((prev) =>
        prev.map((d) =>
          d.DeviceId === DeviceId ? { ...d, IsActive: !isActive } : d
        )
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const exportToCSV = () => {
    const csvData = devices.map((device) => ({
      ID: device.DeviceId,
      Tipo: device.DeviceType,
      Serial: device.Serial,
      Fabricante: device.TradeMark,
      Modelo: device.Model,
      Descripción: device.Description,
      RFID: device.RFID,
      Estado: device.IsActive ? "Activo" : "Inactivo",
    }));

    const csvHeaders = Object.keys(csvData[0]).join(",");
    const csvRows = csvData.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([`${csvHeaders}\n${csvRows}`], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Dispositivos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAssignClick = (device) => {
    setSelectedDevice(device);
  };

  const filteredDevices = devices.filter((device) =>
    `${device.DeviceType} ${device.Serial} ${device.TradeMark} ${device.Model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "DeviceId", headerName: "ID", width: 70 },
    //{ field: "DeviceType", headerName: "Tipo", width: 130 }, Activar si se quiere visualizar el id del dispositivo en el formulario
    { field: "Serial", headerName: "Serial", width: 130 },
    { field: "TradeMark", headerName: "Fabricante", width: 130 },
    { field: "Model", headerName: "Modelo", width: 130 },
    { field: "Description", headerName: "Descripción", width: 200 },
    { field: "RFID", headerName: "RFID", width: 130 },
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
      width: 280,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditingDevice(params.row);
              setShowForm(true);
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: params.row.IsActive ? "red" : "green",
              color: "white",
            }}
            onClick={() => toggleDeviceStatus(params.row.DeviceId, params.row.IsActive)}
          >
            {params.row.IsActive ? "Inactivar" : "Activar"}
          </Button>
          <IconButton onClick={() => handleAssignClick(params.row)}>
            <PersonAdd />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Banner />
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestión de Dispositivos
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Buscar Dispositivos..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 300 }}
            InputProps={{ startAdornment: <Search /> }}
          />
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={() => {
                setEditingDevice(null);
                setShowForm(true);
              }}
              startIcon={<Add />}
              sx={{ backgroundColor: colors.primaryGreen }}
            >
              Crear
            </Button>
            <Button
              variant="contained"
              onClick={exportToCSV}
              startIcon={<Download />}
              sx={{ backgroundColor: colors.primaryGreen }}
            >
              Exportar
            </Button>
          </Box>
        </Box>

        <DataGrid
          rows={filteredDevices}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.DeviceId}
          autoHeight
        />

        {/* MODAL DE ASIGNACIÓN */}
        <AssignUserModal
          open={!!selectedDevice}
          onClose={() => setSelectedDevice(null)}
          device={selectedDevice}
          onAssigned={fetchDevices}
        />
      </Paper>
    </Container>
  );
};

export default DeviceList;
