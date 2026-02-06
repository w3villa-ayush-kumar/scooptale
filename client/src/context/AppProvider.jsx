import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(true);

  const login = useCallback(async (token) => {
    localStorage.setItem("token", token);
    setToken(token);

    const res = await api.get("/user/me");
    setUser(res.data.data);
    setLoadingUser(false);
  }, []);

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
        setUser(data.data);
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
    try {
      setLoadingUser(true);

      const res = await api.get("/user/me");

      setUser(res.data.data);
    } finally {
      setLoadingUser(false);
    }
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
