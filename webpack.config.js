// npm modules 
const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  // Encountered problems using this w/ dev server
  // https://github.com/zeit/now-cli/issues/167
  // https://github.com/zeit/now-cli/issues/160
  // https://github.com/facebookincubator/create-react-app/issues/1185
  // Couldn't get suggested fix to work so switching to file loader for simplicity
  new HtmlWebpackPlugin({
    template: 'index.html',
    // template: PATHS.template,
    // inject:   true,
  }),
];

const rules = [
  {
    test:    /\.jsx?$/,
    exclude: /(node_modules)/,

    use: [
      {
        loader: 'babel-loader',
      },
      {
        options: {
          failOnError:   true,
          failOnWarning: true,
          emitError:     true,
          emitWarning:   true,
        },
        loader: 'eslint-loader',
      },
    ],
  },
];

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
};

module.exports = config;
