module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                shop: {
                    pink: '#FF0080',
                    blue: '#0070F3',
                    cyan: '#50E3C2',
                    orange: '#F5A623',
                    violet: '#7928CA',
                    accents: '#111',
                    primary: '#195A00',
                    secondary: '#AF872F',
                    success: '#27AE60',
                    warning: '#E2b93b',
                    error: '#eb5757',
                },
            },
            fontFamily: {
                nunito: ['Nunito', 'sans-serif'],
                rubik: ['"Rubik Distressed"', 'cursive'],
                vibes: ['"Great Vibes"', 'cursive'],
                inter: ['"Inter"', 'sans-serif'],
            },
        },
    },
    variants: {
        scrollbar: ['rounded'],
    },
    plugins: [
        /*   require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'), */
    ],
}
