import styles from './index.module.css'

const cities = [
    'Москва',
    'Новосибирск',
    'Казань'
];

function FavouriteCities() {
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                {cities}
            </div>
        </div>
    );
}

export default FavouriteCities;