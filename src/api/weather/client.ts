import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApiClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: apiKey,
    units: "metric",
    lang: "en",
  },
  timeout: 10000,
});
