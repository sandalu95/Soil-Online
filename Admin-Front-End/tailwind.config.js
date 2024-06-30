/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2E3',
          100: "#E6F9DE",
          200: "#C8F4BF",
          300: "#9DE097",
          400: "#72C273",
          500: "#469A4E",
          600: "#338442",
          700: "#236E38",
          800: "#16592F",
          900: "#0D4929",
        },
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

