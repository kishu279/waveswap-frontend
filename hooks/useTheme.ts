"use client";

import { useEffect, useState, useCallback } from "react";
import { getTheme, setTheme as setThemeUtil, type Theme } from "@/lib/theme";

/**
 * React hook for theme management
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    setThemeUtil(currentTheme);
    setMounted(true);
  }, []);

  // Change theme function
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeUtil(newTheme);
    setThemeState(newTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    return newTheme;
  }, [theme, setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted,
    isLight: theme === "light",
    isDark: theme === "dark",
  };
}
