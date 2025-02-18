/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        mainColor: '#059669',
        secondBgColor: '#047857'
      },
      colors: {
        primaryTextColor: '#059669',
      },

    },
  },
  plugins: [
    daisyui,
  ],
}

