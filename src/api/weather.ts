const apiKey = 'f6ff5e7dcd656163a217302f41dc2916';

export async function getWeather(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Weather data:', data); // здесь смотри, какие поля приходят
    return data;
}

export async function getForecast(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Ошибка запроса прогноза: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Forecast data:', data);
    return data;
}