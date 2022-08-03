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

const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // 替换 optimize-css-assets-webpack-plugin 插件


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
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    path: config.build.assetsRoot,
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
    
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env'),
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false'
    }),
    // copy custom assets
    // 复制自定义的静态文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public'),
        //   to: config.build.assetsSubDirectory,
          to: path.join(__dirname, '../dist'),
          globOptions: {
            dot: true,
            gitignore: false,
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    
    new MiniCssExtractPlugin(
      {
        filename: utils.assetsPath('css/[name].[contenthash:8].css'),
        chunkFilename: utils.assetsPath('css/[id].[contenthash:8].css')
      }
    ),
    
    new CssMinimizerWebpackPlugin(),
    
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: "body",
      scriptLoading: "blocking",  // 现代浏览器支持非阻塞javascript加载(“defer”)，以提高页面启动性能。 默认：defer
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

    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["dist"]
    }),
  ]
})

module.exports = webpackConfig