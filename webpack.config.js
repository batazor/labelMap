const path = require('path')
const webpack = require('webpack')

const configApp = {
  APP_ENV: process.env.APP_ENV === 'develop',
  APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 4000,
  APP_DEV: process.env.APP_DEV ? parseInt(process.env.APP_DEV) : 4100,
}

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.APP_DEBUG || 'false'))
});

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:' + configApp.APP_DEV,
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/',
    filename: 'bundle.js'
  },
  devtool: configApp.APP_ENV ? 'eval' : 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(configApp.APP_ENV))
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loaders: "style-loader!css-loader?root=."
      }
    ]
  }
};
