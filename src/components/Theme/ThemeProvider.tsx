import { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { getThemeByTime } from '../../utils/getThemeByTime';
import {
    THEME_TYPES,
    THEME_STORAGE_KEY,
    HTML_THEME_ATTRIBUTE,
    THEME_UPDATE_INTERVAL_MS,
} from '../../constants';
import type { Theme, ThemeProviderProps } from "./type";

export const ThemeProvider = ({ children, defaultTheme = THEME_TYPES.SYSTEM }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

        if (
            stored === THEME_TYPES.LIGHT ||
            stored === THEME_TYPES.DARK ||
            stored === THEME_TYPES.SYSTEM
        ) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const resolved: Theme =
            theme === THEME_TYPES.SYSTEM ? getThemeByTime() : theme;

        document.documentElement.setAttribute(HTML_THEME_ATTRIBUTE, resolved);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (theme !== THEME_TYPES.SYSTEM) return;

        const applyCurrent = () => {
            const current = getThemeByTime();
            document.documentElement.setAttribute(HTML_THEME_ATTRIBUTE, current);
        };

        applyCurrent();

        const id = window.setInterval(applyCurrent, THEME_UPDATE_INTERVAL_MS);

        return () => window.clearInterval(id);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
