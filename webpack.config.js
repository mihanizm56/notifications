/* eslint-disable global-require */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: './lib/index.ts',
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
      //   alias: {
      //     '@': path.resolve(__dirname, 'lib/'),
      //   },
    },
    plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            // 'cache-loader',
            // {
            //   loader: 'thread-loader',
            //   options: {
            //     workers: require('os').cpus().length - 1,
            //     poolRespawn: false,
            //   },
            // },
            {
              loader: 'ts-loader',
              options: {
                // transpileOnly: true,
                // happyPackMode: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[name]-[hash:base64:3]',
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };
};
