/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF8F5',
        foreground: '#2C302E',
        ivory: '#FAF8F5',
        cream: '#F4EFEA',
        gold: {
          light: '#E6CA65',
          DEFAULT: '#C5A059',
          dark: '#99732B',
          soft: '#D4AF37'
        },
        sage: {
          light: '#A3B18A',
          DEFAULT: '#606C5D',
          dark: '#3F4E40',
          deep: '#2D3A2E'
        },
        rose: {
          light: '#F8EDEB',
          DEFAULT: '#E8D1CC',
          gold: '#B76E79'
        },
        sand: '#E9E4DC',
        terracotta: '#A65B48'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Alex Brush"', '"Pinyon Script"', '"Great Vibes"', 'cursive'],
        script: ['"Great Vibes"', '"Alex Brush"', 'cursive'],
        body: ['"Montserrat"', 'sans-serif'],
        sans: ['"Montserrat"', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.92' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
