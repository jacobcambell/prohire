module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        eerieblack: '#242424',
        spanishgrey: '#959595',
        saffron: '#EEBD23',
        ultrared: '#F26D7D'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
