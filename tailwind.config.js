/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#0B1220',
        dusk: '#141F38',
        indigo: '#1B2A4A',
        mist: '#E8EDF5',
        cloud: '#F8FAFC',
        aurora: '#2DD4BF',
        haze: '#F59E0B',
        ember: '#EF4444',
        violet: '#8B5CF6',
        slate: {
          750: '#2A3A5C'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(45, 212, 191, 0.35)',
        card: '0 8px 30px -12px rgba(0, 0, 0, 0.5)'
      },
      backgroundImage: {
        'sky-strip': 'linear-gradient(90deg, #2DD4BF 0%, #A3E635 20%, #F59E0B 45%, #FB923C 65%, #EF4444 85%, #991B1B 100%)'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 }
        }
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
