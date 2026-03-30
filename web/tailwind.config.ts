import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: '#FDEAE8',
          200: '#F9C5C1',
          300: '#F49F99',
          400: '#E06B62',
          500: '#C04138',
          600: '#9C332C',
          700: '#782620',
          800: '#541A16',
          900: '#300F0D',
        },
        secondary: {
          100: '#FFF0E8',
          200: '#FFD5BC',
          300: '#FFBA90',
          400: '#FE9364',
          500: '#FC6C38',
          600: '#E0561F',
          700: '#B84418',
          800: '#903311',
          900: '#68230B',
        },
        card: {
          light: '#FFFFFF',
          dark: '#2C2C2E',
        },
        surface: {
          light: '#F2F2F7',
          dark: '#1A1A1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
