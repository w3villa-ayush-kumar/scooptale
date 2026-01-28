import axios from "axios";
import { env } from "../config/env.js";

const tmdbClient = axios.create({
  baseURL: env.tmdbBaseUrl,
  params: {
    api_key: env.tmdbApiKey,
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdbClient.get("/trending/movie/week");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbClient.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (tmdbId) => {
  const response = await tmdbClient.get(`/movie/${tmdbId}`);
  return response.data;
};
