var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: './dist',
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, query: {presets: ['es2015', 'react']} },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.ttf$/, loader: "url-loader" }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './app/index.html'
    })
  ]
};
