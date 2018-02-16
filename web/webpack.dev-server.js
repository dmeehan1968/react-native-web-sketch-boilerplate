const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const dev = require('./webpack.common.dev.js')
const appDirectory = require('./webpack.defines.js').appDirectory

module.exports = merge(common, dev, {

  entry: {
    app: [
      'react-hot-loader/patch',
      common.entry,
    ],
  },

  devServer: {
    contentBase: path.resolve(appDirectory, 'dist')
  },

})
