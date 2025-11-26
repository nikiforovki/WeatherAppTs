import styles from './index.module.css'

export default function Today() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Today</h1>
            <span className={styles.title2}>Данные с библиотеки</span>
            <span className={styles.gradus}>Градус</span>
            <span className={styles.title2}>Данные локации</span>
        </div>
    );
}
