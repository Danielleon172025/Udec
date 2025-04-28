# 🖥️ AutoLauncher - Sistema de Control de Dispositivos UDEC

Este script `.bat` automatiza el proceso de **iniciar tanto el backend como el frontend** del sistema **Guardian Udecino**.

---

## 🚀 ¿Qué hace este script?

- Lanza el **servidor backend** (`Node.js + Express`) ubicado en `udec-backend/`.
- Lanza la **aplicación frontend** (`React.js`) ubicada en `udec-frontend/`.
- Abre **dos terminales** independientes para cada proceso.
- Permite que ambos servicios corran en paralelo mientras esta ventana puede cerrarse sin interrumpir los procesos. Preferiblemente configurarlo con una tarea de inicio retardado o en el inicio del sistema operativo

---
