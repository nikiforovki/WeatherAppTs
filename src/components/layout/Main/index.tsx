import styles from './index.module.css';
import Today from '../../toDay';
import WeatherWidget from '../../WeatherWidget';

type Coords = { lat: number; lon: number } | null;

type MainProps = {
    city: string;
    coords: Coords;
    useGeo: boolean;
    onGeoSelect: (lat: number, lon: number) => void;
};

export default function Main({ city, coords, useGeo, onGeoSelect }: MainProps) {
    return (
        <div className={styles.box}>
            <Today
                city={city}
                coords={coords}
                useGeo={useGeo}
                onGeoSelect={onGeoSelect}
            />
            <WeatherWidget
                city={city}
                coords={coords}
                useGeo={useGeo}
            />
        </div>
    );
}
