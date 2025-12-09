import { createContext } from 'react';
import { THEME_TYPES } from '../../constants';
import type { ThemeProviderState } from "./type";

const initialTheme: ThemeProviderState = {
    theme: THEME_TYPES.SYSTEM,
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initialTheme);
