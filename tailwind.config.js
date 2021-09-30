const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./public/index.html', './src/**/*.svelte'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      bluegray: colors.bluegray,
      coolgray: colors.coolgray,
      gray: colors.gray,
      // truegray: colors.truegray,
      // warmgray: colors.warmgray,
      red: colors.red,
      // orange:colors.orange,
      // amber:colors.amber,
      yellow: colors.yellow,
      // lime:colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      // violet:colors.violet,
      purple: colors.purple,
      fuschia: colors.fuschia,
      // pink:colors.pink,
      rose: colors.rose,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}