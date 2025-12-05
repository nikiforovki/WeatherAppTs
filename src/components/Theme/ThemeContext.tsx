import { createContext } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialTheme: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initialTheme);