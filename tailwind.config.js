/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
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
        page: token("page"),
        surface: token("surface"),
        sunken: token("sunken"),
        ink: {
          DEFAULT: token("ink"),
          2: token("ink-2"),
          3: token("ink-3"),
        },
        rule: token("rule"),
        storm: {
          DEFAULT: token("storm"),
          on: token("on-storm"),
          label: token("storm-label"),
        },
        sky: {
          DEFAULT: token("sky"),
          tint: token("sky-tint"),
        },
        sun: {
          DEFAULT: token("sun"),
          on: token("on-sun"),
          icon: token("sun-icon"),
        },
        btn: {
          DEFAULT: token("btn"),
          on: token("on-btn"),
        },
        danger: token("danger"),
      },
      fontFamily: {
        sans: ["Figtree", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "Figtree", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        sheet: "28px",
      },
    },
  },
  plugins: [],
};
