import type { ReactNode } from "react";
import type { Theme } from "../../types";

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
