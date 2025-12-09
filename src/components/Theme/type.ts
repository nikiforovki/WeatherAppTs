import type { ReactNode } from 'react';
import { THEME_TYPES } from '../../constants';

export type Theme = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];

export type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};

export type Props = {
    children: ReactNode;
    defaultTheme?: Theme;
};