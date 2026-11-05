/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      colors: {
        brand: {
          dark: '#0A0A1A',
          surface: '#12122A',
          mint: '#34D399',
          sky: '#38BDF8',
          purple: '#818CF8',
          light: '#F0F0FF',
          muted: '#6868A0'
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #818CF8 100%)'
      },
      animation: {
        'fade-in': 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
