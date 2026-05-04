import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0fdf6",
          100: "#dcfce9",
          200: "#bbf7d4",
          300: "#86efb2",
          400: "#4ade86",
          500: "#22c563",
          600: "#16a34d",
          700: "#15803e",
          800: "#166534",
          900: "#14532b",
          950: "#023020",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f3d9b5",
          300: "#e8c28a",
          400: "#D4A373",
          500: "#c28a52",
          600: "#b47645",
          700: "#965d3b",
          800: "#7a4c34",
          900: "#64402d",
          950: "#352016",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#fdf8f0",
          100: "#f9edda",
          200: "#f3d9b5",
          300: "#e8c28a",
          400: "#D4A373",
          500: "#c28a52",
          600: "#b47645",
          700: "#965d3b",
          800: "#7a4c34",
          900: "#64402d",
          950: "#352016",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        shimmer: {
          "0%, 100%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/placeholder.svg?height=1080&width=1920')",
        "gradient-primary": "linear-gradient(to right, #023020, #034a30)",
        "gradient-secondary": "linear-gradient(to right, #D4A373, #c28a52)",
        "gradient-accent": "linear-gradient(135deg, #023020 0%, #D4A373 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
