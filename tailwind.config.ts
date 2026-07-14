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
          50: "#fef4ec",
          100: "#fde0cd",
          200: "#fac09b",
          300: "#f6a06a",
          400: "#f08838",
          500: "#E8772E",
          600: "#d3641d",
          700: "#b04f18",
          800: "#8c3f16",
          900: "#723516",
          950: "#3d1a09",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#f6f6f5",
          100: "#e7e7e4",
          200: "#d0cfca",
          300: "#b0aea6",
          400: "#8a8880",
          500: "#6f6d64",
          600: "#585650",
          700: "#484641",
          800: "#3a3835",
          900: "#2b2b2b",
          950: "#1a1918",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#fef4ec",
          100: "#fde0cd",
          200: "#fac09b",
          300: "#f6a06a",
          400: "#f08838",
          500: "#E8772E",
          600: "#d3641d",
          700: "#b04f18",
          800: "#8c3f16",
          900: "#723516",
          950: "#3d1a09",
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
        "gradient-primary": "linear-gradient(to right, #E8772E, #d3641d)",
        "gradient-secondary": "linear-gradient(to right, #2b2b2b, #3a3835)",
        "gradient-accent": "linear-gradient(135deg, #2b2b2b 0%, #E8772E 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
