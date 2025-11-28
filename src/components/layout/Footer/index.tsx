import styles from "./index.module.css";
import { useWeather } from "../../../hooks/useWeather.ts";

type FooterProps = {
    city: string;
};

function formatTime(unix?: number) {
    if (!unix) return '-';
    const date = new Date(unix * 1000);
    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });
}


export default function Footer({ city }: FooterProps) {
    const { data, isLoading, isError, error } = useWeather(city);

    if (isLoading) {
        return <div>Загрузка погодных данных...</div>;
    }

    if (isError) {
        return <div>Ошибка: {(error as Error).message}</div>;
    }

    if (!data) return null;

    const sunriseUnix = data.sys?.sunrise;
    const sunrise = formatTime(sunriseUnix);
    const sunsetUnix = data.sys?.sunset;
    const sunset = formatTime(sunsetUnix);
    const humidity= data.main?.humidity;
    const windSpeed= data.wind?.speed;
    const pressure= data.main?.pressure;
    const feelsLike= data.main?.feels_like;


    return (
        <>
        <h1>Weather Details</h1>
        <div className={styles.container}>
            <div className={styles.cart}>
                <span className={styles.title}>ВОСХОД</span>
                <div className={styles.sub}>
                <span className={styles.weatherData}>{sunrise} am</span>
                    <img src='../../../../public/icons/icon-Sunrise.svg' alt='Sunrise'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>ЗАКАТ</span>
                <div className={styles.sub}>
                <span className={styles.weatherData}>{sunset} pm</span>
                    <img src='../../../../public/icons/icon-Sunset.svg' alt='Sunset'/>
                    </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>ОСАДКИ</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>60%</span>
                    <img src='../../../../public/icons/icon-Raindrop.svg' alt='Precipitation'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>ВЛАЖНОСТЬ</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>{humidity}%</span>
                    <img src='../../../../public/icons/icon-Exclusion.svg' alt='Humidity'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>ВЕТЕР</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>{windSpeed} km/h</span>
                    <img src='../../../../public/icons/icon-Wind.svg' alt='Wind'/>
                </div>
            </div>


            <div className={styles.cart}>
                <span className={styles.title}>ДАВЛЕНИЕ</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>{pressure}hPa</span>
                    <img src='../../../../public/icons/icon-Group.svg' alt='Pressure'/>
                </div>
            </div>


            <div className={styles.cart}>
                <span className={styles.title}>ПО ОЩУЩЕНИЯМ</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>{feelsLike}°</span>
                    <img src='../../../../public/icons/icon-Temperature.svg' alt='Feels like'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>ВИДИМОСТЬ</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>{50} km</span>
                    <img src='../../../../public/icons/icon-Visibility.svg' alt='Visibility'/>
                </div>
            </div>
        </div>
        </>
    );
}