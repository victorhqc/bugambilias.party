module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#8e4690',
        'primary-300': '#ddc7dd',
        secondary: '#dbbe78',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
