const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const configApp = {
  APP_ENV: process.env.APP_ENV === 'develop',
  APP_PORT_DEV: process.env.APP_PORT_DEV ? parseInt(process.env.APP_PORT_DEV) : 4100,
}

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src')
]

const stylusLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 5 version',
  'postcss-loader',
  'stylus-loader?includePaths[]=' + path.resolve(__dirname, './src')
]

const devFlagPlugin = new webpack.DefinePlugin({
  __APP_ENV__: configApp.APP_ENV,
  __APP_PORT__: configApp.APP_PORT_DEV
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:' + configApp.APP_PORT_DEV,
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: configApp.APP_ENV ? 'eval' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', stylusLoaders.join('!'))
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(configApp.APP_ENV))
    }),
    new ExtractTextPlugin("styles.css"),
    new HtmlPlugin({
      title: 'Label map',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/template.html'),
    })
  ],
};
