import styles from "./index.module.css";


export default function Footer() {
    return (
        <>
        <h1>Weather Details</h1>
        <div className={styles.container}>
            <div className={styles.cart}>
                <span className={styles.title}>SUNRISE</span>
                <div className={styles.sub}>
                <span className={styles.weatherData}>06:47 am</span>
                    <img src='../../../../public/icons/icon-Sunrise.svg' alt='Sunrise'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>SUNSET</span>
                <div className={styles.sub}>
                <span className={styles.weatherData}>05:04 pm</span>
                    <img src='../../../../public/icons/icon-Sunset.svg' alt='Sunset'/>
                    </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>PRECIPITATION</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>60%</span>
                    <img src='../../../../public/icons/icon-Raindrop.svg' alt='Precipitation'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>HUMIDITY</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>15%</span>
                    <img src='../../../../public/icons/icon-Exclusion.svg' alt='Humidity'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>Wind</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>17 km/h</span>
                    <img src='../../../../public/icons/icon-Wind.svg' alt='Wind'/>
                </div>
            </div>


            <div className={styles.cart}>
                <span className={styles.title}>Pressure</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>1021 hPa</span>
                    <img src='../../../../public/icons/icon-Group.svg' alt='Pressure'/>
                </div>
            </div>


            <div className={styles.cart}>
                <span className={styles.title}>Feels like</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>26.6°</span>
                    <img src='../../../../public/icons/icon-Temperature.svg' alt='Feels like'/>
                </div>
            </div>

            <div className={styles.cart}>
                <span className={styles.title}>Visibility</span>
                <div className={styles.sub}>
                    <span className={styles.weatherData}>50 km</span>
                    <img src='../../../../public/icons/icon-Visibility.svg' alt='Visibility'/>
                </div>


            </div>
        </div>
        </>
    );
}