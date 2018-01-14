const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Javascript rule
const javascript = {
  test: /\.(js)$/,
  use: [{
    loader: 'babel-loader',
    options: {
      presets: ['env']
    }
  }],
};

// image loader

const images = {
  test: /\.(png|jpg|gif)$/,
  use: 'file-loader?name=[name].[ext]&outputPath=images/'


}


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
  test: /\.(s?css)$/,
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
    rules: [javascript, styles, images]
  },
  // plugins: [uglify]
  plugins: [
    new ExtractTextPlugin('style.css'),
  ]
};

process.noDeprecation = true;

module.exports = config;