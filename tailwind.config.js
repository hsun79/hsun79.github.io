/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: {
        "2xl": "100%",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--primary-background)",
        foreground: "var(--primary-paragraphs)",
        primary: {
          DEFAULT: "var(--button-background)",
          foreground: "var(--button-text)",
        },
        secondary: {
          DEFAULT: "var(--primary-details)",
          foreground: "var(--primary-paragraphs)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "var(--primary-details)",
          foreground: "var(--primary-paragraphs)",
        },
        accent: {
          DEFAULT: "var(--accent-details)",
          foreground: "var(--accent-paragraphs)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gray: {
          100: "var(--accent-background)",
          200: "var(--primary-details)",
          300: "var(--accent-details)",
          400: "#b6b1a4",
          500: "#8e8a7e",
          600: "var(--primary-paragraphs)",
          700: "#3a3a3a",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
        pink: {
          50: "var(--accent-background)",
          100: "var(--primary-details)",
          200: "var(--accent-details)",
          600: "var(--button-background)",
          800: "var(--button-background-hover)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['Libre Baskerville', 'serif'],
        display: ['Libre Baskerville', 'serif'],
        heading: ['Libre Baskerville', 'serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} 