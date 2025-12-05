import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';
import { getThemeByTime } from '../../utils/getThemeByTime';

type Props = {
    children: ReactNode;
    defaultTheme?: Theme;
};

const STORAGE_KEY = 'theme';

export const ThemeProvider = ({ children, defaultTheme = 'system' }: Props) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;

        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const resolved: Exclude<Theme, 'system'> =
            theme === 'system' ? getThemeByTime() : theme;

        document.documentElement.setAttribute('data-theme', resolved);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (theme !== 'system') return;

        const applyCurrent = () => {
            const current = getThemeByTime();
            document.documentElement.setAttribute('data-theme', current);
        };

        applyCurrent();

        const id = window.setInterval(applyCurrent, 2 * 60 * 1000);

        return () => window.clearInterval(id);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};