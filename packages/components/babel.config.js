module.exports = api => {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: false,
                loose: true,
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        'babel-plugin-styled-components',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ]
    ];

    return {
        presets,
        plugins,
    };
};