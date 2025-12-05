import { useContext, useCallback } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
import { getThemeByTime } from "../../utils/getThemeByTime";
import styles from "./index.module.css";

export function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    const effectiveTheme = theme === "system" ? getThemeByTime() : theme;
    const isDark = effectiveTheme === "dark";

    const handleClick = useCallback(() => {
        const next = isDark ? "light" : "dark";
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
        {isDark ? "NIGHTMODE" : "DAYMODE"}
      </span>

            <span className={styles.thumb}>
        {isDark ? (
            <span className={styles.iconMoon}>☾</span>
        ) : (
            <span className={styles.iconSun}>☼</span>
        )}
      </span>
        </button>
    );
}

