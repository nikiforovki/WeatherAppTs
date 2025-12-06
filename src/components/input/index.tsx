import { useEffect, useState } from 'react';
import styles from './index.module.css';

type InputProps = {
    onSearch: (city: string) => void;
};

type FavoriteCity = {
    id: string;
    name: string;
    country: string;
};

const LS_KEY = 'favoriteCities';

export default function Input({ onSearch }: InputProps) {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [favorites, setFavorites] = useState<FavoriteCity[]>([]);


    useEffect(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                setFavorites(parsed);
            }
        } catch (e) {
            console.error('Ошибка чтения избранных городов', e);
        }
    }, []);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            onSearch(value.trim());
            setIsOpen(false);
        }
    };

    const handleClick = () => {
        if (value.trim()) {
            onSearch(value.trim());
            setIsOpen(false);
        }
    };

    const handleSelectFavorite = (city: FavoriteCity) => {
        setValue(city.name);
        onSearch(city.name);
        setIsOpen(false);
    };

    const handleRemoveFavorite = (id: string) => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            if (!stored) return;

            const parsed = JSON.parse(stored) as FavoriteCity[];
            if (!Array.isArray(parsed)) return;

            const updated = parsed.filter((c) => c.id !== id);

            localStorage.setItem(LS_KEY, JSON.stringify(updated));
            setFavorites(updated);
        } catch (e) {
            console.error('Ошибка удаления избранного города', e);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    placeholder="Введите город"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => {
                        setTimeout(() => setIsOpen(false), 150);
                    }}
                    onKeyDown={handleKeyDown}
                />

                {isOpen && favorites.length > 0 && (
                    <div className={styles.dropdown}>
                        {favorites.map((city) => (
                            <div key={city.id} className={styles.dropdownItem}>
                                {/* выбор города */}
                                <span
                                    className={styles.cityName}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelectFavorite(city);
                                    }}
                                >
                {city.country}, {city.name}
              </span>
                                <button
                                    className={styles.removeBtn}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleRemoveFavorite(city.id);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button className={styles.button} onClick={handleClick}>
                Найти
            </button>
        </div>
    );
}
