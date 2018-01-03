const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Javascript rule
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['env']
    } // this is one way of passing options
  }],
};

// postcss loader
const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({
        browsers: 'last 3 versions'
      })];
    },
    sourceMap: true
  },

};

// sass/css loader
const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

// Uglify
const uglify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});



const config = {
  entry: {
    App: './public/js/kolekcija-vina.js'
  },
  devtool: 'source-map',

  output: {

    path: path.resolve(__dirname, 'public', './dist'),
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript, styles]
  },
  // plugins: [uglify]
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

process.noDeprecation = true;

module.exports = config;