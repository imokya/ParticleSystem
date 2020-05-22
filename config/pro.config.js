const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./common.config.js')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const prodConfig =  {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
}

const config = merge(commonConfig, prodConfig)

module.exports = config


