/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#363538',
        'custom-gray': '#49494b',
        'custom-white': '#f6f6f6',
        'custom-main': '#408697'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
