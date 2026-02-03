import api from "../../services/api";

export const fetchShelves = async () => {
  const { data } = await api.get("/user-movies/shelves");
  return data;
};
