import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("mm_user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("mm_token") || null);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("mm_user", JSON.stringify(userData));
    localStorage.setItem("mm_token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mm_user");
    localStorage.removeItem("mm_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
