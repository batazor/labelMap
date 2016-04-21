const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/__build__/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }]
  },
  devServer: {
    hot: false,
    colors: true,
    inline: true,
    historyApiFallback: true,
    contentBase: __dirname
  },
};
