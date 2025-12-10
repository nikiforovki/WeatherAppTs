import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

export default apiClient;
