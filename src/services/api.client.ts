import axios from "axios";
import { getToken } from "../shared/utils/auth";

export const apiClient = axios.create({
  baseURL: "https://api.manahilalilm.sa",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});