const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./common.config.js')

const devConfig =  {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    open: false,
    hot: true
  },
  module: {
    rules: [
      { 
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          },
          'postcss-loader',
          'stylus-loader'
        ] 
      },
      { 
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          },
          'postcss-loader'
        ] 
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig)