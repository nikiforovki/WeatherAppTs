import { useContext, useCallback } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
import { getThemeByTime } from "../../utils/getThemeByTime";
import styles from "./index.module.css";
import { THEME_TYPES, THEME_LABELS, THEME_ICONS } from "../../constants/theme";

export function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    const effectiveTheme =
        theme === THEME_TYPES.SYSTEM ? getThemeByTime() : theme;
    const isDark = effectiveTheme === THEME_TYPES.DARK;

    const handleClick = useCallback(() => {
        const next = isDark ? THEME_TYPES.LIGHT : THEME_TYPES.DARK;
        setTheme(next);
    }, [isDark, setTheme]);

    return (
        <button
            type="button"
            className={`${styles.switch} ${
                isDark ? styles.switchDark : styles.switchLight
            }`}
            onClick={handleClick}
        >
      <span className={styles.label}>
        {isDark ? THEME_LABELS.DARK : THEME_LABELS.LIGHT}
      </span>

            <span className={styles.thumb}>
        {isDark ? (
            <span className={styles.iconMoon}>{THEME_ICONS.DARK}</span>
        ) : (
            <span className={styles.iconSun}>{THEME_ICONS.LIGHT}</span>
        )}
      </span>
        </button>
    );
}
