const common = require('../../webpack.common')
const path = require('path')
const merge = require('webpack-merge')

module.exports = merge(common, {
  entry: './es/index.js',
  output: {
    filename: 'sharing-hooks.js',
    library: 'sharing-hooks',
    path: path.resolve(__dirname, './dist')
  }
})
