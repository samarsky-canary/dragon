const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        //will automatically inject bundle js into ./dist/index.html
        new HTMLWebpackPlugin({
            template: './src/templates/index.pug', //source
            minify: false,
            inject: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/resources', to: 'resources' },
            ],
        }),
    ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
      rules: [
          // process .pug template's files
          {
              test: /\.pug/,
              use: 'pug-loader'
          },
          {
              test: /\.s[ac]ss$/i,
              use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              loader: 'file-loader',
              options: {
                  name: '[path][name].[ext]',
              },
          },

      ],
  },
};