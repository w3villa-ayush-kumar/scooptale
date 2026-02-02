import { useEffect, useState } from "react";
import api from "../services/api";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(true);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const updateUser = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const { data } = await api.get("/user/me");
        setUser(data);
      } catch (err) {
        console.error(err);
        logout();
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [token]);

  const refreshUser = async () => {
    if (!token) return;

    const { data } = await api.get("/user/me");

    setUser(data);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loadingUser,
        updateUser,
        setUser,
        refreshUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
