import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

fetchWeatherData();

async function checkWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error('Network response was not ok')
            return;
        }
        const data = await response.json();
        console.log(data, 'data');
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

checkWeather();