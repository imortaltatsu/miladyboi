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
        waifu: {
          red: '#FF1744',
          'red-dark': '#D50000',
          pink: '#FF4081',
          coral: '#FF6E88',
          purple: '#B968C7',
          lavender: '#E1BEE7',
          bg: '#0A0A0A',
          'bg-light': '#1A1A1A',
        },
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
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'drift-alt': 'drift-alt 20s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -10px) scale(1.05)' },
          '50%': { transform: 'translate(-5px, -20px) scale(1)' },
          '75%': { transform: 'translate(-10px, -10px) scale(1.05)' },
        },
        'drift-alt': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(-15px, 10px) rotate(-2deg)' },
          '66%': { transform: 'translate(15px, -10px) rotate(2deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
