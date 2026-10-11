export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#070A14",
          900: "#0C1020",
          800: "#121A30",
          700: "#1B2541",
          600: "#273352",
        },
        rocket: {
          300: "#FFC08A",
          400: "#FF9A3C",
          500: "#FF7A1A",
          600: "#E6620A",
        },
        zest: {
          300: "#DDFF8F",
          400: "#C6F85A",
          500: "#B6F23C",
          600: "#93CF1F",
        },
        candy: {
          300: "#FFA3D0",
          400: "#FF6FB5",
          500: "#FF4FA3",
        },
        sky: {
          300: "#9BE7FF",
          400: "#4DD8FF",
          500: "#1FC5F5",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(77,216,255,0.35)",
        pop: "0 10px 30px -10px rgba(255,122,26,0.55)",
      },
    },
  },
  plugins: [],
};
