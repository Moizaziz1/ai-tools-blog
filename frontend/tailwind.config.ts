import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0a0a12",
          soft: "#12121f",
          muted: "#1e1e2e",
        },
        paper: {
          DEFAULT: "#faf9ff",
          warm: "#f3f1fa",
          cream: "#e8e4f0",
        },
        accent: {
          DEFAULT: "#6c3ce9",
          soft: "#a78bfa",
          pale: "#ede9fe",
          glow: "#6c3ce920",
        },
        amber: {
          DEFAULT: "#f59e0b",
          soft: "#fbbf24",
        },
        emerald: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
        },
        rose: {
          DEFAULT: "#f43f5e",
          light: "#ffe4e6",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(108, 60, 233, 0.15)",
        "glow-lg": "0 0 40px rgba(108, 60, 233, 0.2)",
        "card-hover": "0 20px 60px -15px rgba(108, 60, 233, 0.15), 0 8px 20px -8px rgba(0, 0, 0, 0.08)",
        "card": "0 4px 20px -4px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
        "elevated": "0 8px 30px -8px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(135deg, rgba(108, 60, 233, 0.05) 0%, transparent 50%, rgba(245, 158, 11, 0.05) 100%)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            color: "var(--text)",
            lineHeight: "1.8",
            "h2, h3, h4": {
              color: "var(--text-header)",
              fontWeight: "700",
            },
            a: {
              color: "#6c3ce9",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            },
            blockquote: {
              borderLeftColor: "#6c3ce9",
              backgroundColor: "var(--accent-pale)",
              padding: "1rem 1.5rem",
              borderRadius: "0 0.75rem 0.75rem 0",
            },
            code: {
              backgroundColor: "var(--bg-hover)",
              padding: "0.125rem 0.375rem",
              borderRadius: "0.375rem",
              fontSize: "0.875em",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
