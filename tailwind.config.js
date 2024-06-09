/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transformOrigin: {
                'right-bottom': 'right bottom',
                'left-bottom': 'left bottom',
            },
            borderWidth: {
                '10': '10px',
            },
            width: {
                '70': '70px',
                '100': '100px',
                '200': '200px',
                '250': '250px',
            },
            height: {
                '50': '50px',
                '70': '70px',
                '100': '100px',
                '400': '400px',
            },
            inset: {
                '50': '50px',
                '-30': "-30px",
                '-90': "-90px",
                '-100': "-100px",
                '120': '120px',
                '150': '150px',
                '210': "210px",
            },
            rotate: {
                '-30': '-30deg',
                '30': '30deg',
                '60': '60deg',
                '-60': '-60deg',
            },
            margin: {
                '120': '120px',
            },
            borderRadius: {
                'custom': '0.5rem',
            },
            fontSize: {
                'custom-xl': '1.5rem',
            },
            spacing: {
                '0.25em': '0.25em',
            },
        },
    },
    plugins: [],
}

