import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
  const savedAuth = localStorage.getItem("auth");

  if (savedAuth) {
    const parsed = JSON.parse(savedAuth);
    setUser(parsed.user);
    setToken(parsed.token);
  }
}, []);


  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem(
    "auth",
    JSON.stringify({
      user: userData,
      token: jwtToken,
    })
  );
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
