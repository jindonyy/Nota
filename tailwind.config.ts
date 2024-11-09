import type { Config } from 'tailwindcss';

import variables from '@/styles/variables.module.scss';

const config = {
    content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: variables,
        },
    },
    plugins: [],
} satisfies Config;

export default config;
