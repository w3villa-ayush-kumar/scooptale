import { toast } from "sonner";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      toast.error("Network error. Check your connection.");
      return Promise.reject(err);
    }
    const status = err.response?.status;
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Something went wrong";

    if (status === 401) {
      localStorage.removeItem("token");

      toast.error("Session expired. Please login again.");

      setTimeout(() => {
        window.location.replace("/login");
      }, 1200);

      return Promise.reject(err);
    }

    if (message) {
      toast.error(message);
    }

    return Promise.reject(err);
  },
);

export default api;
