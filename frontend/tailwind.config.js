/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#1C1C1E',
        'custom-gray': '#2C2C2E',
        'custom-white': '#f2F7FA',
        'custom-main': '#408697',
        'custom-main-hover': '#276D7E'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
