import styles from './index.module.css'
import Today from "../../toDay";
import WeatherWidget from "../../WeatherWidget";

export default function Main() {
    return (
        <div className={styles.box}>
        <Today />
        <WeatherWidget />
        </div>
    );
}

