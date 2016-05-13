const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

const configApp = {
  ENV: process.env.ENV === 'develop',
  PORT_DEV: process.env.PORT_DEV ? parseInt(process.env.PORT_DEV) : 4100,
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
  __ENV__: configApp.ENV,
  __PORT__: configApp.PORT_DEV
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:' + configApp.PORT_DEV,
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: configApp.ENV ? 'eval' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', stylusLoaders.join('!'))
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  sassLoader: {
    includePaths: [ path.resolve(__dirname, './src') ]
  },
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(configApp.ENV))
    }),
    new ExtractTextPlugin("styles.css", { allChunks: true }),
    new HtmlPlugin({
      title: 'Label map',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/template.html'),
    })
  ],
};
