import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

export default api;
