import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // <-- use NEXT_PUBLIC_ for client
  withCredentials: true,
});

export default api;
