import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#191970", // Purple
          light: "#3730a3", // Light Purple
          dark: "#1e3a8a", // Vivid Purple
        },
        secondary: {
          DEFAULT: "#008080", // Teal
          light: "#6b21a8", // Medium Teal
          dark: "#4c1d95", // Light Teal
        },
        accent: {
          DEFAULT: "#FF7F00", // Red
          light: "#FFA500", // Crimson Red
          dark: "#991B1B", // Dark Red
        },
        neutral: {
          DEFAULT: "#6B7280", // Gray (unchanged)
          light: "#D1D5DB", // Light Gray (unchanged)
          dark: "#FB4COD", // Dark Gray (unchanged)
        },
        success: {
          DEFAULT: "#34D399", // Green (unchanged)
          light: "#6EE7B7", // Light Green (unchanged)
          dark: "#065F46", // Dark Green (unchanged)
        },
        warning: {
          DEFAULT: "#FBBF24", // Yellow (unchanged)
          light: "#FDE68A", // Light Yellow (unchanged)
          dark: "#B45309", // Dark Yellow (unchanged)
        },
        danger: {
          DEFAULT: "#EF4444", // Red (unchanged)
          light: "#FCA5A5", // Light Red (unchanged)
          dark: "#991B1B", // Dark Red (unchanged)
        },
        info: {
          DEFAULT: "#3B82F6", // Blue (unchanged)
          light: "#93C5FD", // Light Blue (unchanged)
          dark: "#1E40AF", // Dark Blue (unchanged)
        },
        white: "#FFFFFF", // White (unchanged)
        black: "#000000", // Black (unchanged)
      },
      animation: {
        typewriter: "typewriter 4s steps(40) 1s forwards",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
