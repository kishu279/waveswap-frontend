/**
 * Theme System for WaveSwap
 * 2 Themes: Light (default) & Dark
 */

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "waveswap-theme";
const DEFAULT_THEME: Theme = "light";

/**
 * Get the current theme from localStorage
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return DEFAULT_THEME;
}

/**
 * Set theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Initialize theme on page load
 * Call this in layout.tsx or _app.tsx
 */
export function initTheme(): Theme {
  const theme = getTheme();
  setTheme(theme);
  return theme;
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
  const current = getTheme();
  const next: Theme = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
