import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Global brand chrome */
        brand: {
          ink: "var(--brand-ink)",
          cream: "var(--brand-cream)",
          white: "var(--brand-white)",
          "text-dark": "var(--brand-text-dark)",
        },
        /* Section-scoped theme colors — resolved by data-theme attribute */
        section: {
          primary: "var(--section-primary)",
          accent: "var(--section-accent)",
          surface: "var(--section-surface)",
          highlight: "var(--section-highlight)",
        },
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        screening: ["var(--font-cormorant)", "serif"],
        gaming: ["var(--font-rajdhani)", "sans-serif"],
      },
      fontSize: {
        /* Fluid type scale using clamp() — scales smoothly from 360px to 1920px */
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.375rem)",
        "fluid-xl": "clamp(1.25rem, 1rem + 1.25vw, 1.75rem)",
        "fluid-2xl": "clamp(1.5rem, 1.1rem + 2vw, 2.25rem)",
        "fluid-3xl": "clamp(1.875rem, 1.3rem + 2.875vw, 3rem)",
        "fluid-4xl": "clamp(2.25rem, 1.5rem + 3.75vw, 4rem)",
        "fluid-5xl": "clamp(3rem, 2rem + 5vw, 5rem)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "steam": {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "1" },
          "50%": { transform: "translateY(-20px) scaleX(1.2)", opacity: "0.6" },
          "100%": { transform: "translateY(-40px) scaleX(0.8)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px var(--section-accent)" },
          "50%": { boxShadow: "0 0 20px var(--section-accent), 0 0 40px var(--section-accent)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        steam: "steam 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
