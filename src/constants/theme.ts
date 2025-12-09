export const THEME_TYPES = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system',
} as const;

export const THEME_STORAGE_KEY = 'theme';
export const HTML_THEME_ATTRIBUTE = 'data-theme';
export const THEME_UPDATE_INTERVAL_MS = 2 * 60 * 1000;

export const THEME_LABELS = {
    DARK: 'NIGHTMODE',
    LIGHT: 'DAYMODE',
} as const;

export const THEME_ICONS = {
    DARK: '☾',
    LIGHT: '☼',
} as const;