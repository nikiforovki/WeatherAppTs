
const apiKey = 'f6ff5e7dcd656163a217302f41dc2916';
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
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data, 'data');
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

checkWeather();