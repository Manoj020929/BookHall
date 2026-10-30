import { createContext, useContext, useState } from "react";
import api from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [isStaff, setIsStaff] = useState(localStorage.getItem("is_staff") === "1");

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login/", { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("username", username);
    localStorage.setItem("is_staff", data.is_staff ? "1" : "0");
    setUser(username);
    setIsStaff(!!data.is_staff);
  };

  const register = async (username, email, password) => {
    await api.post("/auth/register/", { username, email, password });
    await login(username, password);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsStaff(false);
  };

  return (
    <AuthContext.Provider value={{ user, isStaff, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);