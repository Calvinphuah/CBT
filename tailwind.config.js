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
        pen: token("pen"),
        margin: token("margin"),
        soft: token("soft"),
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
        hand: ["var(--font-hand)"],
      },
      borderRadius: {
        card: "18px",
        sheet: "28px",
      },
    },
  },
  plugins: [],
};
