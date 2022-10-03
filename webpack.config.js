const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  mode,
  entry: './src/index.ts',
  devtool: 'eval',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    filename: '[contenthash].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    hot: true,
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
};