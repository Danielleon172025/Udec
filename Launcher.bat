@echo off
title UDEC - AutoLauncher
color 0a

echo =======================================
echo  LANZANDO SISTEMA UDEC DISPOSITIVOS...
echo ========================================
echo.

REM == Iniciar Backend ==
start "BACKEND" cmd /k "cd udec-backend && npm start"

REM == Iniciar Frontend ==
start "FRONTEND" cmd /k "cd udec-frontend && npm start"

echo ========================================
echo 🟢 Todos los procesos se están ejecutando...
echo Puedes cerrar esta ventana sin afectar los procesos.
echo ========================================
pause