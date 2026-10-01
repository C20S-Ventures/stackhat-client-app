const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

// Bootstrap 3 Sass predates current Dart Sass; silence its known deprecations so real problems stay visible
const sassLoader = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      quietDeps: true,
      silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'slash-div'],
    },
  },
};

module.exports = {
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
        use: ['style-loader', 'css-loader', sassLoader]
      },
      {
        test: /Print\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', sassLoader]
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
    // jQuery is bundled from npm (needed by bootstrap-slider) rather than loaded from a CDN
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(require('../package.json').version),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    // Webpack 5 no longer polyfills Node core modules
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },

  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: { errors: true, warnings: false },
    },
    port: 4001,
  },

  cache: {
    type: 'filesystem',
  },
};
