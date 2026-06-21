// PATH: client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#EEEDFE",
          100: "#CECBF6",
          200: "#AFA9EC",
          400: "#7F77DD",
          600: "#534AB7",
          800: "#3C3489",
          900: "#26215C",
        },
        teal: {
          50: "#E1F5EE",
          400: "#1D9E75",
          600: "#0F6E56",
        },
        red: {
          50: "#FCEBEB",
          200: "#F09595",
          400: "#E24B4A",
        },
        amber: {
          400: "#BA7517",
        },
        surface: {
          primary: "#ffffff",
          secondary: "#F7F7F5",
          sidebar: "#FAFAF8",
        },
        border: {
          DEFAULT: "rgba(0,0,0,0.10)",
          strong: "rgba(0,0,0,0.18)",
        },
        ink: {
          primary: "#1C1C1A",
          secondary: "#5F5E5A",
          muted: "#9A9994",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontSize: {
        "2xs": ["10px", "1.4"],
        xs: ["11px", "1.5"],
        sm: ["12px", "1.5"],
        base: ["14px", "1.65"],
        md: ["15px", "1.5"],
      },
      keyframes: {
        pulse: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
        bounce: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wave: {
          "0%,100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        micRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(226,75,74,0.25)" },
          "100%": { boxShadow: "0 0 0 10px rgba(226,75,74,0)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        pulse: "pulse 1.2s ease-in-out infinite",
        bounce: "bounce 1.1s ease-in-out infinite",
        wave: "wave 0.75s ease-in-out infinite",
        micRing: "micRing 1.1s ease-out infinite",
        fadeUp: "fadeUp 0.2s ease forwards",
      },
    },
  },
  plugins: [],
};
