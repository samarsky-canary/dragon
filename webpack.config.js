const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleaner = require('clean-webpack-plugin');
module.exports = {
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
  entry: { 
      index : './src/index.js',
      rect: './src/rectInit.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins: [
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