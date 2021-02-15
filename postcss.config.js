module.exports = {
    plugins: [
        [
            'postcss-preset-env',
            {
                stage: 3,
                features: {
                    'nesting-rules': true,
                },
                browsers: 'last 2 versions',
            },
        ],
    ],
};
