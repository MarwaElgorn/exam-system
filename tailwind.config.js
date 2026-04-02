/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "submit-bg": "#4a90d9",
        "submit-hover": "#2563eb",
        "submit-disabled": "#94a3b8",
        "submit-done": "#22c55e",
      },
      boxShadow: {
        submit: "0 4px 16px rgba(74, 144, 217, 0.35)",
      },
    },
  },
  safelist: [
    "bg-submit-bg",
    "bg-submit-hover",
    "hover:bg-submit-hover",
    "bg-submit-disabled",
    "bg-submit-done",
    "shadow-submit",
    "shadow-lg",
  ],
  plugins: [],
};