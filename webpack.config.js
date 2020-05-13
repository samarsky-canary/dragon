const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

// Here we make config for webpack and export it by module.export
module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './script.js',
    output: {
        //
        filename: '[name].js',
        path: path.resolve(__dirname,'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: path.resolve(__dirname,'src','templates','layout.njk'),
                    to: 'index.html'
                }
            ]
        }),
    ]
};