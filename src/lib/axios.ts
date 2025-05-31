import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

http.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${localStorage.getItem("token") || ""}`;
  return request;
});
