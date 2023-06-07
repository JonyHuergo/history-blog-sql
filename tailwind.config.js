/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, jsx, ts, tsx}",
    "./components/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#14213D",
        "secondary": "#FCA311",
        "tertiary": "#E5E5E5",
        "neutral-light": "#FFFFFF",
        "neutral-dark": "#000000"
      },
      fontFamily: {
        nunito: ["Nunito"],
        title: ["Poppins"],
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar')
  ],
  variants: {
      scrollbar: ['rounded']
  }
}