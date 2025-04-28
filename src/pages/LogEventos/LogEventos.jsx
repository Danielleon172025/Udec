import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import * as XLSX from "xlsx";
import moment from "moment";

const API_URL = process.env.REACT_APP_API_URL;
const tiposEventos = ["Todos", "Login", "Usuarios", "Dispositivos", "Penalidades", "Perfiles"];
const colores = ["#4caf50", "#2196f3", "#ffc107", "#f44336", "#9c27b0", "#00acc1"];

const LogEventos = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterType, setFilterType] = useState("Todos");
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const params = {};
      if (filterType !== "Todos") params.module = filterType;
      if (filterDate) params.startDate = filterDate;

      const { data } = await axios.get(`${API_URL}/api/eventlog`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      const eventData = Array.isArray(data) ? data : data.data || [];
      setEvents(eventData);
    } catch (error) {
      console.error(" Error al cargar logs:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [filterType, filterDate]);

  const filteredEvents = events.filter((event) =>
    event.Description?.toLowerCase().includes(search.toLowerCase()) ||
    event.Username?.toLowerCase().includes(search.toLowerCase())
  );

  const eventCounts = filteredEvents.reduce((acc, event) => {
    const date = moment(event.RegisterDate).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(eventCounts).map((fecha) => ({
    fecha,
    cantidad: eventCounts[fecha],
  }));

  const moduleCounts = filteredEvents.reduce((acc, event) => {
    acc[event.Module] = (acc[event.Module] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(moduleCounts).map(([name, value]) => ({ name, value }));

  const exportToExcel = () => {
    const dataToExport = filteredEvents.map((event) => ({
      Fecha: moment(event.RegisterDate).format("YYYY-MM-DD HH:mm"),
      Usuario: event.Username,
      Módulo: event.Module,
      Descripción: event.Description,
    }));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LogEventos");
    XLSX.writeFile(wb, "log_eventos.xlsx");
  };

  const getRowColor = (module) => {
    switch (module) {
      case "Login": return "#e8f5e9";
      case "Usuarios": return "#e3f2fd";
      case "Dispositivos": return "#fff8e1";
      case "Penalidades": return "#ffebee";
      case "Perfiles": return "#f3e5f5";
      default: return "#ffffff";
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom> Log de Eventos</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          select
          label="Módulo"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ width: 200 }}
        >
          {tiposEventos.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Fecha"
          InputLabelProps={{ shrink: true }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          sx={{ width: 200 }}
        />

        <TextField
          label="Buscar por usuario o descripción"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />

        <Button variant="contained" onClick={exportToExcel}>📥 Exportar Excel</Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : filteredEvents.length === 0 ? (
        <Typography>No hay eventos disponibles.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell><strong>Usuario</strong></TableCell>
                <TableCell><strong>Módulo</strong></TableCell>
                <TableCell><strong>Descripción</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => (
                <TableRow
                  key={event.EventLogId}
                  sx={{ backgroundColor: getRowColor(event.Module), cursor: "pointer" }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <TableCell>{moment(event.RegisterDate).format("YYYY-MM-DD HH:mm")}</TableCell>
                  <TableCell>{event.Username}</TableCell>
                  <TableCell>{event.Module}</TableCell>
                  <TableCell>{event.Description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      {/*  Modal Detalle */}
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} fullWidth>
        <DialogTitle>
          Detalles del Evento
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setSelectedEvent(null)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedEvent && (
            <>
              <Typography><strong>Usuario:</strong> {selectedEvent.Username}</Typography>
              <Typography><strong>Fecha:</strong> {moment(selectedEvent.RegisterDate).format("LLLL")}</Typography>
              <Typography><strong>Módulo:</strong> {selectedEvent.Module}</Typography>
              <Typography><strong>Descripción:</strong> {selectedEvent.Description}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/*  Gráficos */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom> Eventos por Día</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom> Eventos por Módulo</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              dataKey="value"
              data={pieData}
              outerRadius={80}
              label={({ name }) => name}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LogEventos;
