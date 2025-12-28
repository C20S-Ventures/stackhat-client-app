const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const path = require('path');

module.exports = {
  // Exclude jquery for react slider dep
  externals: {
    jquery: 'jQuery'
  },

  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /Print\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /Print\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'StackHat App',
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/icon.png'
    }),
    new MiniCssExtractPlugin({
      filename: 'print.css'
    }),
    new WebpackAutoInject({}),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },

  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    historyApiFallback: true,
    hot: true,
    port: 4001,
  },

  cache: {
    type: 'filesystem',
  },
};
