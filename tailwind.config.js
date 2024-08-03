/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 0px 21px 7px rgba(0,0,0,0.1)',
        'custom-light': '0px 0px 15px -4px rgba(0,0,0,0.1);',
      },
      fontFamily:{
        raleway:['raleway','sans-serif'],
      },
      screens: {
        'sm': '300px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
  variant:{
    extend: {
      display: ["focus-group"]
    }
  }
}

