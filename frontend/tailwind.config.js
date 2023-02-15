/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#0D0D0D',
        'custom-gray': '#212124',
        'custom-white': '#f6f6f6',
        'custom-main': '#408697',
        'custom-main-hover': '#276D7E'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
