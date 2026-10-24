/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        mayer: {
          // Azul Marino Institucional: títulos, header, fondos oscuros, tradición
          navy: {
            DEFAULT: '#0F296B', // rgb(15, 41, 107)
            50: '#F4F6FB',
            100: '#E6EBF5',
            200: '#C7D3EA',
            300: '#9FB3DC',
            400: '#5479C1',
            500: '#0F296B',
            600: '#0C2258',
            700: '#091A43',
            800: '#06122F',
            900: '#03091B'
          },
          // Azul Rey: SOLO botones principales, enlaces y estados activos
          royal: {
            DEFAULT: '#254EB6', // rgb(37, 78, 182)
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
          // Dorado Oficial: SOLO acentos pequeños (laureles, línea, número destacado)
          gold: {
            DEFAULT: '#FBB600', // rgb(251, 182, 0)
            50: '#FFFDF0',
            100: '#FFF9D6',
            200: '#FFF0A8',
            300: '#FFE675',
            400: '#FFD73D',
            500: '#FBB600',
            600: '#D49700',
            700: '#A87400'
          },
          // Neutros institucionales derivados del azul marino
          subtle: '#F4F6FB', // fondo alterno sobrio
          text: '#1E2A4A',   // texto principal de alto contraste
          muted: '#475569',  // texto secundario legible
          fog: '#F8FAFC'
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Merriweather', 'Georgia', 'serif']
      },
      boxShadow: {
        'card-soft': '0 4px 16px -2px rgba(15, 41, 107, 0.06)',
        'elevated': '0 12px 28px -6px rgba(15, 41, 107, 0.12)',
        'mayer-soft': '0 8px 24px -4px rgba(15, 41, 107, 0.08)',
        'mayer-card': '0 2px 12px -2px rgba(15, 41, 107, 0.06)',
        'mayer-elevated': '0 16px 36px -8px rgba(15, 41, 107, 0.14)',
        'mayer-gold': '0 4px 16px -2px rgba(251, 182, 0, 0.25)'
      }
    }
  },
  plugins: []
};
