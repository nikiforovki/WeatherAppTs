import styles from './index.module.css';

export default function Input() {
    return (
        <div>
            <input className={styles.input} placeholder='Введите город' />
        </div>
    );
}

