module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        // '4': '100px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
