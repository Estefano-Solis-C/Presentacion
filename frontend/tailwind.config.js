/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        mayer: {
          royal: {
            DEFAULT: '#254EB6', // rgb(37, 78, 182) - Primary Mayerino Royal Blue
            50: '#EEF3FF',
            100: '#DCE7FE',
            200: '#BFD3FD',
            300: '#93B7FA',
            400: '#6093F5',
            500: '#254EB6',
            600: '#1D3FA2',
            700: '#173383',
            800: '#122765',
            900: '#0E1D4A'
          },
          navy: {
            DEFAULT: '#0F296B', // rgb(15, 41, 107) - Deep Institutional Navy
            50: '#F0F4FA',
            100: '#D9E3F3',
            200: '#B3C7E7',
            300: '#8CABDB',
            400: '#4D73B8',
            500: '#0F296B',
            600: '#0C2156',
            700: '#091A43',
            800: '#06122F',
            900: '#03091B'
          },
          sky: {
            DEFAULT: '#0284C7',
            50: '#F0F9FF',
            100: '#E0F2FE',
            500: '#0284C7',
            600: '#0369A1'
          },
          gold: {
            DEFAULT: '#FBB600', // rgb(251, 182, 0) - Official Mayerino Gold
            50: '#FFFDF0',
            100: '#FFF9D6',
            200: '#FFF0A8',
            300: '#FFE675',
            400: '#FFD73D',
            500: '#FBB600',
            600: '#D49700',
            700: '#A87400'
          },
          red: {
            DEFAULT: '#DC2626',
            50: '#FEF2F2',
            500: '#DC2626',
            600: '#B91C1C'
          },
          fog: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', '"Plus Jakarta Sans"', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      boxShadow: {
        'card-soft': '0 10px 30px -10px rgba(15, 41, 107, 0.08)',
        'elevated': '0 20px 40px -15px rgba(15, 41, 107, 0.16)',
        'mayer-soft': '0 12px 32px -8px rgba(15, 41, 107, 0.12)',
        'mayer-card': '0 4px 20px -4px rgba(15, 41, 107, 0.08)',
        'mayer-elevated': '0 20px 40px -12px rgba(15, 41, 107, 0.18)',
        'mayer-gold': '0 8px 24px -4px rgba(251, 182, 0, 0.30)'
      }
    }
  },
  plugins: []
};
