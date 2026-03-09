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
                // Claymorphism Color Palette
                clay: {
                    50: '#F9F5F0',
                    100: '#F3E9DC',
                    200: '#E6D2BC',
                    300: '#D6B89C',
                    400: '#C9A889',
                    500: '#8B7355',
                    600: '#5A4233',
                    700: '#3D2E25',
                    800: '#2A1F18',
                    900: '#1A130E',
                },
                primary: {
                    light: '#5A4233',
                    dark: '#E6D2BC',
                },
                secondary: {
                    light: '#8B7355',
                    dark: '#D6B89C',
                },
                accent: {
                    light: '#C9A889',
                    dark: '#F3E9DC',
                },
                background: {
                    light: '#F9F5F0',
                    dark: '#1A130E',
                },
                surface: {
                    light: '#F3E9DC',
                    dark: '#2A1F18',
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float-3d': 'float3d 6s ease-in-out infinite',
                'tilt': 'tilt 10s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                    '33%': { transform: 'translateY(-20px) translateX(10px)' },
                    '66%': { transform: 'translateY(-10px) translateX(-10px)' },
                },
                float3d: {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)',
                        transformStyle: 'preserve-3d',
                    },
                    '50%': {
                        transform: 'translateY(-20px) rotateX(5deg) rotateY(5deg)',
                        transformStyle: 'preserve-3d',
                    },
                },
                tilt: {
                    '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
                    '50%': { transform: 'rotateX(5deg) rotateY(5deg)' },
                },
                glow: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                },
            },
            boxShadow: {
                'clay': '20px 20px 40px rgba(90, 66, 51, 0.15), -10px -10px 30px rgba(255, 255, 255, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                'clay-hover': '25px 25px 50px rgba(90, 66, 51, 0.2), -15px -15px 40px rgba(255, 255, 255, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
                'clay-inner': 'inset 8px 8px 16px rgba(90, 66, 51, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.7)',
            },
            backdropBlur: {
                'clay': 'blur(20px)',
            },
        },
    },
    plugins: [],
}
