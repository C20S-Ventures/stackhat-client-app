const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
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

const packageJson = require('../package.json');

function buildVersion(buffer) {
  const ver = JSON.parse(buffer.toString());
  ver.version = packageJson.version;
  return JSON.stringify(ver, null, 2);
}

module.exports = {
  mode: 'production',

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
        use: [MiniCssExtractPlugin.loader, 'css-loader', sassLoader]
      },
      {
        test: /Print\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', sassLoader]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
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

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'StackHat App',
      template: './src/index.html',
      filename: './index.html',
      hash: true,
      favicon: './src/assets/icon.png'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/404.html', to: './404.html' },
        {
          from: './src/version.json',
          to: './version.json',
          transform: (content) => buildVersion(content)
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
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

  cache: {
    type: 'filesystem',
  },
};
