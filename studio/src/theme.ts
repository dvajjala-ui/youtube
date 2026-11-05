import React, { createContext, useContext } from "react";

/**
 * One theme per brand. The default is the E01 palette; a client project passes its own
 * `brand.json` through <ThemeProvider> and every kit component picks it up.
 * One color = one meaning: `fail` for failure, `ok` for healthy, `warn` for attention.
 */
export type Theme = {
  name: string;
  bg: string;
  ink: string;
  dim: string;
  fail: string;
  ok: string;
  warn: string;
  panel: string;
  panelBorder: string;
  /** Accent for progress bars, caption borders, hero numbers. Defaults to `fail`. */
  accent: string;
  mono: string;
  sans: string;
  /** Grid cell size behind every Stage; 0 disables the grid. */
  grid: number;
};

export const defaultTheme: Theme = {
  name: "studio-default",
  bg: "#0D0D0F",
  ink: "#F2F2F0",
  dim: "#8A8A93",
  fail: "#FF3B30",
  ok: "#2ED573",
  warn: "#FFB020",
  panel: "#17171B",
  panelBorder: "#26262C",
  accent: "#FF3B30",
  mono: "'Cascadia Mono', 'JetBrains Mono', Consolas, 'Courier New', monospace",
  sans: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  grid: 72,
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider: React.FC<{ theme: Partial<Theme>; children?: React.ReactNode }> = ({
  theme,
  children,
}) =>
  React.createElement(ThemeContext.Provider, { value: { ...defaultTheme, ...theme } }, children);

export const useTheme = (): Theme => useContext(ThemeContext);

/** Loads a client `brand.json` (any subset of Theme) and fills the gaps with the default. */
export const themeFrom = (brand: Partial<Theme>): Theme => ({ ...defaultTheme, ...brand });

// Backwards-compatible constants (E01 scenes import these directly).
export const BG = defaultTheme.bg;
export const INK = defaultTheme.ink;
export const DIM = defaultTheme.dim;
export const RED = defaultTheme.fail;
export const GREEN = defaultTheme.ok;
export const AMBER = defaultTheme.warn;
export const PANEL = defaultTheme.panel;
export const MONO = defaultTheme.mono;
export const SANS = defaultTheme.sans;
