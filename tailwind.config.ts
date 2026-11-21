import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#101B35", // Deep Navy Blue
          50: "#f0f3f9",
          100: "#d9e2f1",
          200: "#b3c5e3",
          300: "#80a0d1",
          400: "#4f7cbe",
          500: "#2d5fa8",
          600: "#224b89",
          700: "#1b3c6e",
          800: "#101B35",
          900: "#0b1222",
        },
        secondary: {
          DEFAULT: "#2563EB", // Royal Blue
          light: "#3B82F6",   // Electric Blue
          dark: "#1D4ED8",
        },
        accent: "#3B82F6",
        background: "#FFFFFF",
        surface: "#F5F7FA",
        charcoal: "#202938",
        success: "#16A34A",
        warning: "#EAB308",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
