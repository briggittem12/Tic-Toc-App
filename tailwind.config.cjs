/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme"); 

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        display: ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
