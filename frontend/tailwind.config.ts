import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        manga: {
          purple: '#9C27B0',
          pink: '#E91E63',
          cyan: '#00BCD4',
          blue: '#3B82F6',
        },
        neon: {
          pink: '#FF006E',
          orange: '#FF6B00',
          green: '#00FF88',
        },
      },
      fontFamily: {
        display: ['Bangers', 'cursive'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-manga': 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
        'gradient-web3': 'linear-gradient(135deg, #00BCD4 0%, #3B82F6 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}

export default config
