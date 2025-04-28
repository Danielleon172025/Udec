@echo off
title 🧪 Build React App with .env
color 0A

echo 🔍 Limpiando build anterior...
IF EXIST build (
    rmdir /S /Q build
    echo ✅ Build anterior eliminado.
) ELSE (
    echo ⚠️ No se encontró carpeta build.
)

echo.
echo 🌐 Cargando variables del archivo .env...
setlocal EnableDelayedExpansion
for /f "usebackq delims=" %%i in (".env") do (
    set "line=%%i"
    echo !line!
)
echo ✅ Variables listadas (asegúrate que REACT_APP_API_URL exista).
echo.

echo 🧠 Ejecutando: npm run build...
npm run build

IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al compilar el proyecto React.
    pause
    exit /b %ERRORLEVEL%
)

echo 🚀 Build completado con éxito.
echo 💡 Recuerda usar este build desde tu backend con:
echo     app.use(express.static(path.join(__dirname, 'build')))
echo     app.get("*", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))
pause
