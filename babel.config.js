module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    // extensions: ['.ts', '.tsx', '.js', '.json'],
                    alias: {
                        '@src': './src',
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@hooks': './src/hooks'
                    }
                }
            ]
        ]
    };
};
