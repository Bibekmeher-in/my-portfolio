/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#FF6B35',
                secondary: '#F7931E',
                accent: '#FDC830',
                chili: {
                    red: '#FF6B35',
                    orange: '#F7931E',
                    yellow: '#FDC830',
                    dark: '#1A1A1D',
                    darker: '#0D0D0F',
                    light: '#FFE5D9',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                    '33%': { transform: 'translateY(-20px) translateX(10px)' },
                    '66%': { transform: 'translateY(-10px) translateX(-10px)' },
                },
                glow: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                },
            },
        },
    },
    plugins: [],
}
