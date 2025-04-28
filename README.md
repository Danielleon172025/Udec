# 🚀 Backend - API Guardian Udecino

Bienvenido al repositorio oficial del **backend** del proyecto **APLICATIVO WEB PARA MEJORAR EL ACCESO Y CONTROL DE DISPOSITIVOS ELECTRÓNICOS EN LA UNIVERSIDAD DE CUNDINAMARCA EXTENSIÓN CHIA**, encargado de la gestión de usuarios, dispositivos, accesos y eventos de la Universidad de Cundinamarca.

---

## 📦 Tecnologías principales

- 🛠️ **Node.js** + **Express.js** (Servidor API)
- 🛢️ **Microsoft SQL Server** (Base de datos)
- 🛡️ **JWT Authentication** (Seguridad de rutas)
- 📑 **Swagger** (Documentación interactiva de la API)
- 📤 **Multer** (Subida de archivos)
- 🌐 **Cors** (Políticas CORS)
- ⚡ **dotenv** (Variables de entorno)

---

## 📂 Estructura del Proyecto
udecbackend/
 ├── src/ │ 
 ├── controllers/ # Lógica de negocio │
 ├── middleware/ # Middlewares de seguridad │ 
 ├── models/ # Modelos de base de datos │ 
 ├── routes/ # Definición de rutas │ 
 ├── services/ # Servicios (uploads, autenticación, etc) 
 │ └── utils/ # Utilidades y archivos públicos 
 ├── .env # Variables de entorno └── server.js # Archivo principal del servidor

 ## ⚙️ Instalación y configuración

1. Clona el repositorio:

```bash
git clone https://github.com/Danielleon172025/Udec.git
cd udec-backend

npm install

npm start    # ejecucion

#Acceso Apo
http://localhost:5000/api-docs/#/