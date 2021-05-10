const path = require('path');
const { merge } = require('webpack-merge');
const { getCommonConfig } = require('./webpack.common.config');

module.exports = function(env) {
    const config = {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            publicPath: '/',
            compress: true,
            contentBase: path.resolve(__dirname, 'dist'),
            host: '0.0.0.0',
            proxy: {
                '/plugins': 'http://localhost:8070',
                pathRewrite: { '^/api': '' }
            }
        },
    };

    return merge(config, getCommonConfig(env));
};
