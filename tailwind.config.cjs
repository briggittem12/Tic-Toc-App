/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme"); 

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily : {
        display: ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
