const colors = require("tailwindcss/colors");

module.exports = {
  theme: {
    extend: {
      spacing: {
        // '4': '100px'
      },
    },
    colors: {
      // Build your palette here
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      green: colors.green,
      blue: colors.blue,
      yellow: colors.yellow,
      indigo: colors.indigo,
      cyan: colors.cyan,
      teal: colors.teal,
      lime: colors.lime,
      violet: colors.violet,
    },
    maxWidth: {
      "1/64": "1.5875%",
      "1/32": "3.175%",
      "1/16": "6.25%",
      "1/8": "12.5%",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
    },

    borderRadius: {
      none: "0",
      large: "600px",
      medium: "280px",
      lg: "0.5rem",
      md: "0.375rem",
      sm: "0.125rem",
      full: "9999px",
    },
  },
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  plugins: [],
};
