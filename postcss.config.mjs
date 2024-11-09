/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'postcss-dvh': {},
        'postcss-import': {},
        tailwindcss: {},
        'postcss-flexbugs-fixes': {},
        autoprefixer: {},
        'postcss-preset-env': {
            features: {
                'nesting-rules': false,
            },
        },
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
};

export default config;
