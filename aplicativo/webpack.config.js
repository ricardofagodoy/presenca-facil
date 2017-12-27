var webpack = require("webpack");

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/scripts/main.jsx',
  output: {
    path: __dirname + '/www',
    filename: 'scripts.js'
  },
  devServer: {
    port: 8081,
    contentBase: __dirname
  },
  resolve: {
    modules: ["./app/scripts", "./app/styles", "node_modules"],
    extensions: ['.js', '.jsx']
  },
  externals: {
    'Config': JSON.stringify(process.env.ENV === 'prod' ? {
      WS_URL: "https://presenca-facil-java.herokuapp.com/presenca-facil-server/",
      WS_ATTENDANCE_URL: "https://presenca-facil-node.herokuapp.com/attendance/"
    } : {
        WS_URL: "http://localhost:8080/presenca-facil-server/",
        WS_ATTENDANCE_URL: "http://localhost:3000/attendance/"
      })
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(scss|css)$/,
        exclude: /components/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        }
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
          name: 'images/[name].[ext]',
        }
      }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({ inject: true, template: './app/index.html' }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};