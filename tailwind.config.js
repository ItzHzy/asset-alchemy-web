const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            rounded: '5px',
            spacing: {
                0: '0px',
                '05': '5px',
                1: '10px',
                2: '20px',
                3: '30px',
                4: '40px',
                5: '50px',
                6: '60px',
                7: '70px',
                8: '80px',
                8: '90px',
            },
            colors: {
                white: '#FAF9F6',
                primary: {
                    200: '#ffb870',
                    300: '#ffad5c',
                    400: '#ffa347',
                    500: '#ff9933',
                    600: '#e68a2e',
                    700: '#cc7a29',
                    800: '#b36b24',
                },
                neutral: {
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#374151',
                    700: '#1f2937',
                    800: '#111827',
                },
                success: '#339933',
                error: '#E01A4F',
                link: '#08A0E9',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-none': {
                    /* IE and Edge */
                    '-ms-overflow-style': 'none',

                    /* Firefox */
                    'scrollbar-width': 'none',

                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            })
        },
    ],
}
