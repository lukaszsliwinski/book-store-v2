/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        zinc: {
          950: '#09090b'
        },
        neutral: {
          50: '#fafafa'
        }
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
