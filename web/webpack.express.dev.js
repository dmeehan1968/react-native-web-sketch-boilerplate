const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const dev = require('./webpack.common.dev.js')

module.exports = merge(common, dev, {

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      common.entry,
    ],
  },

  output: {
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

})
