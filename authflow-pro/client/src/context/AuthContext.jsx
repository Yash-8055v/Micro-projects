import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api.js"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true;

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      if (mounted) {
        setUser(res.data.user);
      }
    } catch (err) {
      // IMPORTANT: 401 is expected on first load
      if (mounted) {
        setUser(null);
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  };

  checkAuth();

  return () => {
    mounted = false;
  };
}, []);



  const login = async (userData) => {
    try {
    const res = await api.get("/auth/me");
    setUser(res.data.user);
  } catch {
    setUser(null);
  }
    
  };

  

  const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // even if backend fails, still clear UI state
    console.error("Logout error:", error);
  } finally {
    setUser(null);
  }
};


  return (
    <AuthContext.Provider value={{ user,  login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
