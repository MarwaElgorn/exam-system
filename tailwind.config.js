/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      arabic: ["Segoe UI", "Tahoma", "Arial", "sans-serif"],
      sans: ["system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#4a90d9",
        "primary-dark": "#2563eb",
        surface: "#ffffff",
        accent: "#4a90d9",
        "accent-dark": "#2563eb",
        border: "#e2e8f0",
        "text-primary": "#1a202c",
        "text-secondary": "#64748b",
        "selected-bg": "#eaf3fd",
        "selected-border": "#4a90d9",
        "timer-ring": "#4a90d9",
        "timer-expired": "#ef4444",
        "submit-bg": "#4a90d9",
        "submit-hover": "#2563eb",
        "submit-disabled": "#94a3b8",
        "submit-done": "#22c55e",
        "badge-bg": "#e2e8f0",
        "badge-text": "#475569",
        error: "#ef4444",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.07)",
        submit: "0 4px 16px rgba(74, 144, 217, 0.35)",
      },
    },
  },
  plugins: [],
  safelist: [
  "bg-submit-bg",
  "bg-submit-hover",
  "bg-submit-disabled",
  "bg-submit-done",
  "shadow-submit",
],
};
