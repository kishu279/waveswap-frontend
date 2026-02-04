"use client";

import { motion } from "motion/react";
import { useTheme } from "@/hooks/useTheme";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * Theme Toggle Component
 * Simple icon-only toggle that matches neo-brutalist style
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className="w-11 h-11 rounded-full neo-border"
        style={{ background: "var(--color-bg-white)" }}
      />
    );
  }

  const isLight = theme === "light";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-11 h-11 rounded-full neo-border neo-hover flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg-white)" }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
    >
      {/* Sun Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          y: isLight ? 0 : -40,
          opacity: isLight ? 1 : 0,
          rotate: isLight ? 0 : 90,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <FiSun 
          className="w-5 h-5" 
          style={{ color: "var(--color-brand-coral)" }} 
        />
      </motion.div>

      {/* Moon Icon */}
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          y: isLight ? 40 : 0,
          opacity: isLight ? 0 : 1,
          rotate: isLight ? -90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <FiMoon 
          className="w-5 h-5" 
          style={{ color: "var(--color-accent-secondary)" }} 
        />
      </motion.div>
    </motion.button>
  );
}
