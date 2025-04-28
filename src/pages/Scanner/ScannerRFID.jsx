import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  CircularProgress,
  Grid,
  Divider,
  Paper,
  InputAdornment
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import QrCodeIcon from "@mui/icons-material/QrCode";
import axios from "axios";
import logoUdec from "../../assets/images/ESCUDO-COLOR.png";

const ScannerRFID = () => {
  const [rfidInput, setRfidInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (date) =>
    date.toLocaleString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleRegister = async () => {
    const cleanRFID = rfidInput.trim();
    if (!cleanRFID) return;

    clearTimeout(timeoutRef.current);
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/entrance/register`,
        { rfid: cleanRFID }
      );

      setResult(response.data.data);
      setRfidInput("");

      timeoutRef.current = setTimeout(() => {
        setResult(null);
        inputRef.current?.focus();
      }, 5000);
    } catch (error) {
      console.error("Error al registrar:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Error al registrar entrada/salida");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleRegister();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, [rfidInput]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [result]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f7fdf9",
        px: 2,
        fontFamily: "Century Gothic, sans-serif",
      }}
    >
      <Box textAlign="center" mb={2}>
        <img
          src={logoUdec}
          alt="Escudo Universidad de Cundinamarca"
          style={{ width: 100 }}
        />
        <Box
          sx={{
            height: "4px",
            width: "80px",
            backgroundColor: "#FBE122",
            margin: "10px auto",
            borderRadius: "2px",
          }}
        />
        <Typography variant="body2" sx={{ color: "#00482B", mb: 1 }}>
          {formatDateTime(currentTime)}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#00482B", mb: 2 }}
        >
          Registro de Ingreso / Salida
        </Typography>
      </Box>

      <TextField
        inputRef={inputRef}
        autoFocus
        label="Escanea el código RFID"
        value={rfidInput}
        onChange={(e) => setRfidInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QrCodeIcon sx={{ color: "#00482B" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: 350,
          mb: 3,
          "& label.Mui-focused": {
            color: "#007B3E",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#007B3E",
            },
            "&:hover fieldset": {
              borderColor: "#79C000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#007B3E",
            },
          },
        }}
        disabled={loading}
      />

      {loading && <CircularProgress sx={{ mb: 3 }} />}

      {result && (
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            mt: 2,
            maxWidth: 800,
            width: "100%",
            backgroundColor:
              result?.Estado === "Entrada" ? "#e9fbe8" : "#fde8e8",
            borderLeft: `8px solid ${
              result?.Estado === "Entrada" ? "#0c7b2d" : "#b20000"
            }`,
          }}
        >
          <Box textAlign="center" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="#00482B">
              Tipo de Dispositivo: {result?.DeviceType}
            </Typography>
            <Typography>Serial: <strong>{result?.Serial}</strong></Typography>
            <Typography>Marca: {result?.TradeMark}</Typography>
            <Typography>Modelo: {result?.Model}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box textAlign="center">
                <Avatar
                  src={result?.UserImage}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 1,
                    border: "3px solid #007B3E",
                  }}
                />
                <Typography fontWeight="bold">
                  {result?.Firstname} {result?.Lastname}
                </Typography>
                <Typography variant="body2">{result?.Email}</Typography>
                <Typography variant="body2">{result?.Identification}</Typography>
                <Typography variant="body2">{result?.Program}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Usuario
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box textAlign="center">
                <Avatar
                  src={result?.DeviceImage}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 1,
                    border: "3px solid #007B3E",
                  }}
                />
                <Typography fontWeight="bold">{result?.DeviceType}</Typography>
                <Typography variant="body2">Serial: {result?.Serial}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Dispositivo
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography
            fontWeight="bold"
            color={result?.Estado === "Salida" ? "error.main" : "success.main"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            {result?.Estado === "Salida" ? (
              <>
                <CancelIcon />
                Salida registrada correctamente
              </>
            ) : (
              <>
                <CheckCircleOutlineIcon />
                Ingreso registrado correctamente
              </>
            )}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ScannerRFID;
