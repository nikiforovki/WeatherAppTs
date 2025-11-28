import styles from './index.module.css';
import Today from '../../toDay';
import WeatherWidget from '../../WeatherWidget';

type MainProps = {
    city: string;
};

export default function Main({ city }: MainProps) {
    return (
        <div className={styles.box}>
            <Today city={city} />
            <WeatherWidget city={city} />
        </div>
    );
}
