import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Tooltip,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
import PersonIcon from "@mui/icons-material/Person";
import DevicesIcon from "@mui/icons-material/Devices";
import HistoryIcon from "@mui/icons-material/History";
import WarningIcon from "@mui/icons-material/Warning";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import moment from "moment";

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const [recent, setRecent] = useState([]);
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [resCounts, resRecent, resChart] = await Promise.all([
          axios.get(`${API_URL}/api/dashboard/counts`, { headers }),
          axios.get(`${API_URL}/api/dashboard/recent`, { headers }),
          axios.get(`${API_URL}/api/dashboard/activity`, { headers }),
          axios.get(`${API_URL}/api/dashboard/logs`, { headers }),
        ]);

        setCounts(resCounts.data);
        setRecent(Array.isArray(resRecent.data) ? resRecent.data : []);
        setActivityData(resChart.data);
      } catch (error) {
        console.error(" Error en Dashboard:", error);
        setRecent([]);
        setActivityData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    {
      label: "Usuarios",
      value: counts.TotalUsers,
      icon: <PersonIcon fontSize="large" />,
      color: "#007B3E",
    },
    {
      label: "Dispositivos",
      value: counts.TotalDevices,
      icon: <DevicesIcon fontSize="large" />,
      color: "#005a9c",
    },
    {
      label: "Entradas Registradas",
      value: counts.TotalEntries,
      icon: <HistoryIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      label: "Penalidades",
      value: counts.TotalPenalties,
      icon: <WarningIcon fontSize="large" />,
      color: "#d32f2f",
    },
    {
      label: "Perfiles",
      value: counts.TotalProfiles,
      icon: <GroupWorkIcon fontSize="large" />,
      color: "#9c27b0",
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard de Actividad
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Cards*/}
          <Grid container spacing={2} mb={3}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={card.label}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: card.color,
                    color: "white",
                    height: "100%",
                  }}
                >
                  {card.icon}
                  <Typography variant="h6">{card.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {card.value ?? 0}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/*  Gráfico de Actividad */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Actividad Semanal (Ingresos por Día)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <XAxis dataKey="Date" />
                <YAxis />
                <ReTooltip />
                <Bar dataKey="Count" fill="#007B3E" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          {/*  Últimos Registros */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Últimos Ingresos y Salidas
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Usuario</strong></TableCell>
                    <TableCell><strong>Dispositivo</strong></TableCell>
                    <TableCell><strong>Entrada</strong></TableCell>
                    <TableCell><strong>Salida</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(recent) && recent.length > 0 ? (
                    recent.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Tooltip title={`${row.Firstname} ${row.Lastname}`}>
                            <span>{row.Firstname} {row.Lastname}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{row.Serial}</TableCell>
                        <TableCell>
                          {row.DateIn ? moment(row.DateIn).format("YYYY-MM-DD HH:mm") : "—"}
                        </TableCell>
                        <TableCell>
                          {row.DateOut ? (
                            <Chip label={moment(row.DateOut).format("YYYY-MM-DD HH:mm")} color="success" />
                          ) : (
                            <Chip label="En tránsito" color="warning" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No hay registros recientes
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
