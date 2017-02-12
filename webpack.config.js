// npm modules
const path              = require('path');
const webpack           = require('webpack');
const CleanPlugin       = require('clean-webpack-plugin');

// env variables
const production = process.env.NODE_ENV === 'production';

const PATHS = {
  template: path.join(__dirname, 'src/index.html'),
  entry:    path.join(__dirname, 'src/entry'),
  output:   path.join(__dirname, 'build'),
  context:  path.join(__dirname, 'src'),
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    options: {
      devSever: {
        devtool:            'eval-source-map',
        contentBase:        PATHS.build,
        historyApiFallback: true,
        progress:           true,
        stats:              'errors-only',
      },
    },
    debug: !production,
  }),
  new CleanPlugin('build'),
  new webpack.optimize.CommonsChunkPlugin({
    name:      'vendor',
    children:  true,
    minChunks: 1,
  }),
];

const rules = [
  {
    test:    /\.jsx?$/,
    exclude: /node_modules/,
    use:     'babel-loader',

    // use: [
    //   {
    //     loader: 'babel-loader',
    //   },
    //   // {
    //   //   options: {
    //   //     failOnError:   true,
    //   //     failOnWarning: true,
    //   //     emitError:     true,
    //   //     emitWarning:   true,
    //   //   },
    //   //   loader: 'eslint-loader',
    //   // },
    // ],
  },
];

const resolve = {
  extensions: [
    '.js',
    '.json',
    '.jsx',
  ],
};

const config = {
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    app: PATHS.entry,
  },
  output: {
    path:     PATHS.output,
    filename: '[name].bundle.js',
  },
  module: {
    rules,
  },
  stats: {
    reasons:      true,
    errorDetails: true,
  },
  devtool: 'inline-source-map',
  context: PATHS.context,
  plugins,
  resolve,
};

module.exports = config;
