const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

// const babelOptions = preset => {
//   const opts = {
//     presets: 	[['@babel/preset-react'],
//     [
//       '@babel/env',
//       {
//         "loose": true,
//         "targets": {
//           "browsers": [
//           "> 0.1%"
//           ]
//         }
//       }
//     ]],
//     plugins: ['@babel/plugin-proposal-class-properties'],
//   };

//   if (preset) {
//     opts.presets.push(preset);
//   }

//   return opts;
// };

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'lib'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.scss', '.sass', '.css', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'lib'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
  },
  // externals: {
  //   'react': 'react',
  //   'react-dom': 'react-dom',
  //   'classnames': 'classnames'
  // },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(\.module)?s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: ['file-loader']
      // },
      // {
      //   test: /\.(ttf|woff|woff2|eot)$/,
      //   use: ['file-loader']
      // },
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: {
      //     loader: 'babel-loader',
      //     options: babelOptions('@babel/preset-typescript'),
      //   },
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: {
          loader: 'ts-loader',
          // options: babelOptions('@babel/preset-typescript'),
        },
      },
    ],
  },
};
