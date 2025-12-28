const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const packageJson = require('../package.json');

function buildVersion(buffer) {
  const ver = JSON.parse(buffer.toString());
  ver.version = packageJson.version;
  return JSON.stringify(ver, null, 2);
}

module.exports = {
  mode: 'production',

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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /Print\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
    new WebpackAutoInject({}),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },

  cache: {
    type: 'filesystem',
  },
};
