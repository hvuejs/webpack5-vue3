'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 清理dist */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/* 压缩 */
const TerserPlugin = require('terser-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');//压缩css文件


const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false, /* 是否生成SourceMap */
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  stats: {
    preset: 'errors-warnings'
  },
   /* 压缩js */
   optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      // 待会直接自己试一下
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        defaultVendors: {
          test: /\/src\//,
          name: 'rise',
          chunks: 'all',
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 去除console.log
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),
    // copy custom static assets
    // 复制自定义的静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets'),
          to: config.build.assetsSubDirectory,
          // globOptions: {
          //   ignore: ['.*']
          // }
        }
      ]
    }),
    
    new MiniCssExtractPlugin(
      {
        filename: utils.assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: utils.assetsPath('css/[id].[contenthash:8].css')
      }
    ),
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false   //  false 是加引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // 决定了 script 标签的引用顺序。默认有四个选项，'none', 'auto', 'dependency', '{function}'
      chunksSortMode: 'auto'
    }),

    
  ]
})

module.exports = webpackConfig