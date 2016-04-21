const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: [
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
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }]
  },
  devServer: {
    hot: true,
    colors: true,
    inline: true,
    historyApiFallback: true,
    contentBase: __dirname
  },
};
