/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'custom-black': '#1C1C1E',
        'custom-gray': '#2C2C2E',
        'custom-white': '#f2F7FA',
        'custom-main': '#408697',
        'custom-main-hover': '#276D7E'
      },
      screens: {
        xs: '480px'
      },
      boxShadow: {
        dark: '0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25)'
      },
      minHeight: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)'
      }
    }
  },
  plugins: [require('tw-elements/dist/plugin'), require('prettier-plugin-tailwindcss')]
};
