import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // usuario con todos los datos relevantes del token
      setUser({
        userId: decoded.id,
        username: decoded.username,
        profileId: decoded.profileId,
        image: decoded.image || null, 
      });

      if (Array.isArray(decoded.permissions)) {
        setPermissions(decoded.permissions);
      }
    } catch (error) {
      console.error(" Error al decodificar el token:", error);
      localStorage.clear();
      setUser(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, permissions, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
