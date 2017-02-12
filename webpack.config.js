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
  new CleanPlugin('build'),
  new HtmlWebpackPlugin({
    template: PATHS.template,
    inject:   true,
  }),
];

const rules = [
  {
    test:    /\.js$/,
    exclude: /(node_modules)/,
    loader:  'babel-loader',
  },
];

const config = {
  context: PATHS.context,
  entry:   {
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
  plugins,
};

module.exports = config;
