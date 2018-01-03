const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');


const javascript = {
  test: /\.(js)$/, // match anything that ends in `.js`
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] }
  }],
};

// postCSS loader which gets fed into the next loader.

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

// sass/css loader
const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

// Uglify
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});

const config = {
  entry: {
    App: './src/js/kolekcija-vina.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'src', 'dist'),
    publicPath: 'dist/',
    filename: '[name].bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
},

    // module rules
  module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel?{"presets":["es2015"]}',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!postcss-loader")
        },
        {
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=images/[hash].[ext]"
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=80000&minetype=application/font-woff"
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=80000"
        }
    ],
    rules: [javascript, styles]
  },
 
  // plugins: [uglify]
  plugins: [
    // output css to a separate file
    new ExtractTextPlugin('style.css'),
  ]
};

process.noDeprecation = true;

module.exports = config;
