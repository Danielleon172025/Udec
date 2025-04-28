import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";

const ProfileForm = ({ onCancel, onSave, profileData }) => {
  const [formData, setFormData] = useState({ Name: "", Description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (profileData) {
      setFormData({
        Name: profileData.Name || "",
        Description: profileData.Description || "",
      });
      loadPermissions(profileData.IdProfile);
    }
  }, [profileData]);

  const loadPermissions = async (profileId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profile-permissions/${profileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Verifica que venga un objeto válido
      setPermissions(res.data || {});
    } catch (err) {
      console.error("Error al obtener permisos:", err);
    }
  };

  const togglePermission = async (moduleId, moduleOptionId, currentActive) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/profile-permissions`,
        {
          ProfileId: profileData.IdProfile,
          ModuleId: moduleId,
          ModuleOptionId: moduleOptionId,
          Active: !currentActive,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadPermissions(profileData.IdProfile); // Refresca permisos
    } catch (error) {
      console.error("Error al actualizar permiso:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token inválido. Inicia sesión nuevamente.");
      setIsSubmitting(false);
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (profileData) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/profiles/${profileData.IdProfile}`,
          formData,
          config
        );
        alert("Perfil actualizado correctamente.");
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/profiles`, formData, config);
        alert("Perfil creado correctamente.");
      }
      onSave();
    } catch (err) {
      console.error("Error al guardar perfil:", err.response?.data || err.message);
      alert("Hubo un error al guardar el perfil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: "#f4f6f8", padding: 2 }}>
      <Card sx={{ width: 700, padding: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
            {profileData ? "Editar Perfil" : "Crear Perfil"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre del Perfil"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : "Guardar"}
                </Button>
                <Button variant="contained" color="error" onClick={onCancel}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Permisos tabla estilo matriz */}
          {profileData?.IdProfile && (
            <Box mt={5}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Permisos del Perfil
              </Typography>

              <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", mt: 2 }}>
                <Box component="thead" sx={{ backgroundColor: "#e0e0e0" }}>
                  <Box component="tr">
                    <Box component="th" sx={{ textAlign: "left", padding: 1, border: "1px solid #ccc" }}>
                      Módulo
                    </Box>
                    <Box component="th" sx={{ textAlign: "left", padding: 1, border: "1px solid #ccc" }}>
                      Opciones
                    </Box>
                  </Box>
                </Box>

                <Box component="tbody">
                  {Object.entries(permissions).map(([moduleName, options]) => (
                    <Box component="tr" key={moduleName}>
                      <Box
                        component="td"
                        sx={{
                          padding: 1,
                          border: "1px solid #ccc",
                          fontWeight: "bold",
                          width: "30%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {moduleName}
                      </Box>
                      <Box component="td" sx={{ padding: 1, border: "1px solid #ccc" }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                          {options.map((perm) => (
                            <FormControlLabel
                              key={perm.ModuleOptionId}
                              control={
                                <Checkbox
                                  checked={Boolean(perm.Active)}
                                  onChange={() =>
                                    togglePermission(perm.ModuleId, perm.ModuleOptionId, perm.Active)
                                  }
                                />
                              }
                              label={perm.OptionName}
                              sx={{ marginRight: 2 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileForm;
