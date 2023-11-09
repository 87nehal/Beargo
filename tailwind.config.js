/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',

  safelist: [
    'group-hover:text-red-100',
    'group-hover:text-red-400',
    'group-hover:text-green-100',
    'group-hover:text-green-400',
    'group-hover:text-blue-100',
    'group-hover:text-blue-400',
    'group-hover:text-yellow-100',
    'group-hover:text-yellow-400',
  ],

  theme: {

    screens: {
      xs: "614px",
      sm: "1002px",
      md: "1022px",
      lg: "1092px",
      xl: "1280px",
    },

    extend: {

      colors: {
        prime:{
          0:"#6A9C89",
        },
        dim: {
          50: "#5F99F7",
          100: "#5F99F7",
          200: "#38444d",
          300: "#202e3a",
          400: "#253341",
          500: "#5F99F7",
          600: "#5F99F7",
          700: "#192734",
          800: "#162d40",
          900: "#15202b",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

