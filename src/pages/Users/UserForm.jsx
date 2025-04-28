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

const UserForm = ({ onCancel, onSave, userData }) => {
  const [formData, setFormData] = useState({
    IdentificationId: "",
    IdentificationNumber: "",
    Firstname: "",
    Lastname: "",
    Username: "",
    Password: "",
    Email: "",
    ProgramId: "", 
    Image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identifications, setIdentifications] = useState([]);
  const [programs, setPrograms] = useState([]);

  //  Precargar datos cuando `userData` cambia y `programs` ya está cargado
  useEffect(() => {
    if (userData && programs.length > 0) {
      const matchedProgram = programs.find(p => p.Program === userData.Program);
      setFormData({
        IdentificationId: parseInt(userData.IdentificationId) || "",
        IdentificationNumber: userData.Identification || "",
        Firstname: userData.Firstname || "",
        Lastname: userData.Lastname || "",
        Username: userData.Username || "",
        Password: "",
        Email: userData.Email || "",
        ProgramId: userData.ProgramId ? parseInt(userData.ProgramId) : "",
        Image: null,
      });
      setPreviewImage(userData.ImagePath || null);
    }
  }, [userData, programs]);

  //  Obtener identificaciones y programas
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const [resIds, resPrograms] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/identifications/identification`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/programs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setIdentifications(Array.isArray(resIds.data) ? resIds.data : []);
        setPrograms(Array.isArray(resPrograms.data) ? resPrograms.data : []);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setIdentifications([]);
        setPrograms([]);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["IdentificationId", "ProgramId"].includes(name) ? parseInt(value) : value,
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

    formDataToSend.append("Identification", formData.IdentificationNumber);

    ["IdentificationId", "Firstname", "Lastname", "Username", "Email", "ProgramId"].forEach((key) => {
      if (formData[key] || formData[key] === 0) {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.Password) formDataToSend.append("Password", formData.Password);
    if (formData.Image) formDataToSend.append("image", formData.Image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (userData) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userData.UserId}`, formDataToSend, config);
        alert("Usuario actualizado correctamente.");
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, formDataToSend, config);
        alert("Usuario creado correctamente.");
      }

      onSave();
    } catch (error) {
      console.error("Error al guardar el usuario:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Hubo un error al guardar el usuario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: "#f4f6f8", padding: 2 }}>
      <Card sx={{ width: 450, padding: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
            {userData ? "Editar Usuario" : "Crear Usuario"}
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
              {/* Tipo de Identificación */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Tipo de Identificación</InputLabel>
                  <Select
                    name="IdentificationId"
                    value={formData.IdentificationId}
                    onChange={handleChange}
                    label="Tipo de Identificación"
                  >
                    {identifications.map((ident) => (
                      <MenuItem key={ident.IdentificationId} value={ident.IdentificationId}>
                        {ident.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Número de Identificación */}
              <Grid item xs={12}>
                <TextField
                  label="Número de Identificación"
                  name="IdentificationNumber"
                  fullWidth
                  required
                  variant="outlined"
                  value={formData.IdentificationNumber}
                  onChange={handleChange}
                />
              </Grid>

              {/* Programa */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Programa</InputLabel>
                  <Select
                    name="ProgramId"
                    value={formData.ProgramId}
                    onChange={handleChange}
                    label="Programa"
                  >
                    {programs.map((prog) => (
                      <MenuItem key={prog.ProgramId} value={prog.ProgramId}>
                        {prog.Program}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Otros campos */}
              {[
                { label: "Nombre", name: "Firstname", required: true },
                { label: "Apellido", name: "Lastname", required: true },
                { label: "Usuario", name: "Username", required: true },
                { label: "Contraseña", name: "Password", type: "password" },
                { label: "Email", name: "Email", type: "email", required: true },
              ].map(({ label, name, type, required }) => (
                <Grid item xs={12} key={name}>
                  <TextField
                    label={label}
                    name={name}
                    type={type || "text"}
                    fullWidth
                    required={required}
                    variant="outlined"
                    value={formData[name]}
                    onChange={handleChange}
                  />
                </Grid>
              ))}

              {/* Acciones */}
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

export default UserForm;
