const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        'fuchsia': '#9333ea',
        cyan: colors.cyan,
      }
    },
  },
  variants: {},
  plugins: [],
}
