import React, { useContext, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/authcontext";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requiredPermission }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem("token");

  const permissions = useMemo(() => {
    if (!token) return [];
    try {
      const decoded = jwtDecode(token);
      return decoded.permissions || [];
    } catch (err) {
      console.error(" Token inválido:", err);
      return [];
    }
  }, [token]);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h3>Cargando...</h3>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const formattedPermissions = permissions.map((p) => p.toLowerCase().trim());

  if (requiredPermission && !formattedPermissions.includes(requiredPermission.toLowerCase().trim())) {
    console.warn(` Acceso denegado: Falta el permiso ${requiredPermission}`);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
