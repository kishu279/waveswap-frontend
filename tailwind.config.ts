import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens - reference CSS variables
        "bg-primary": "var(--background-primary)",
        "bg-secondary": "var(--background-secondary)",
        "bg-card": "var(--background-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        accent: "var(--accent-primary)",
        "accent-secondary": "var(--accent-secondary)",
        "border-theme": "var(--border-color)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        rubik: ["var(--font-rubik)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
