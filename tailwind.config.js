module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    variants: {
        scrollbar: ['rounded'],
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'),
    ],
}
