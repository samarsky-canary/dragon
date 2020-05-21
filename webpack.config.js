const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const cleaner = require('clean-webpack-plugin');

module.exports = {
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
  entry: { 
      graph: './src/js/graph.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        //will automatically inject bundle js into ./dist/index.html
        new HTMLWebpackPlugin({
            template: './src/index.html', //source
            filename: 'index.html'  //destination
        })
    ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
      rules: [
          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ],
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader',
              ],
          },
      ],
  },
};