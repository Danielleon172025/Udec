import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Grid,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const DeviceForm = ({ onCancel, onSave, deviceData }) => {
  const [formData, setFormData] = useState({
    DeviceTypeId: "", // <-- ID del tipo de dispositivo
    Serial: "",
    TradeMark: "",
    Model: "",
    Description: "",
    RFID: "",
    Image: null,
  });

  const [deviceTypes, setDeviceTypes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar tipos de dispositivos
  useEffect(() => {
    const fetchDeviceTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/device-types`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeviceTypes(response.data);
      } catch (error) {
        console.error("Error al obtener tipos de dispositivo:", error);
      }
    };

    fetchDeviceTypes();
  }, []);

  // Cargar datos del dispositivo si viene para edición
  useEffect(() => {
    if (deviceData) {
      setFormData({
        DeviceTypeId: deviceData.DeviceType || "", // <-- Importante Id Dispositivo!
        Serial: deviceData.Serial || "",
        TradeMark: deviceData.TradeMark || "",
        Model: deviceData.Model || "",
        Description: deviceData.Description || "",
        RFID: deviceData.RFID || "",
        Image: null,
      });

      if (deviceData.ImagePath) {
        setPreviewImage(deviceData.ImagePath);
      }
    }
  }, [deviceData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "DeviceTypeId" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, Image: file }));

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const formDataToSend = new FormData();

    formDataToSend.append("DeviceType", formData.DeviceTypeId);
    formDataToSend.append("Serial", formData.Serial);
    formDataToSend.append("TradeMark", formData.TradeMark);
    formDataToSend.append("Model", formData.Model);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("RFID", formData.RFID);

    if (formData.Image) {
      formDataToSend.append("image", formData.Image);
    }

    try {
      const url = deviceData
        ? `${process.env.REACT_APP_API_URL}/api/devices/${deviceData.DeviceId}`
        : `${process.env.REACT_APP_API_URL}/api/devices`;

      const method = deviceData ? "put" : "post";

      await axios[method](url, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Dispositivo ${deviceData ? "actualizado" : "creado"} correctamente.`);
      onSave();
    } catch (error) {
      console.error("Error al guardar el dispositivo:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Hubo un error al guardar el dispositivo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: "#f4f6f8", padding: 2 }}>
      <Card sx={{ width: 450, padding: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
            {deviceData ? "Editar Dispositivo" : "Crear Dispositivo"}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <Avatar src={previewImage} sx={{ width: 100, height: 100, bgcolor: "#ccc" }}>
              {!previewImage && "Foto"}
            </Avatar>
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Tipo de Dispositivo</InputLabel>
                  <Select
                    name="DeviceTypeId"
                    value={formData.DeviceTypeId}
                    onChange={handleChange}
                    label="Tipo de Dispositivo"
                  >
                    {deviceTypes.map((type) => (
                      <MenuItem key={type.DeviceTypeId} value={type.DeviceTypeId}>
                        {type.DeviceType}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {[
                { label: "Serial", name: "Serial" },
                { label: "Fabricante", name: "TradeMark" },
                { label: "Modelo", name: "Model" },
                { label: "Descripción", name: "Description", multiline: true, rows: 3 },
                { label: "RFID", name: "RFID" },
              ].map(({ label, name, multiline, rows }) => (
                <Grid item xs={12} key={name}>
                  <TextField
                    label={label}
                    name={name}
                    fullWidth
                    required
                    variant="outlined"
                    multiline={multiline}
                    rows={rows}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}

              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : "GUARDAR"}
                </Button>
                <Button variant="contained" color="error" onClick={onCancel}>
                  CANCELAR
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeviceForm;
