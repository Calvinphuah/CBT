/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          orange: "#FFE3D3",
          yellow: "#FFFACA",
          green: "#EAFFFB",
          blue: "#E7F6FF",
          purple: "#EEE5FF",
          pink: "#FFE8EC",
        },
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
