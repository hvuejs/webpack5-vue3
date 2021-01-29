const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  mode: "production",      // 环境模式
  entry: path.resolve(__dirname, './src/main.js'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].js' // 打包完的静态资源文件名
  },
  module: {
    rules: [
       {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
       },
       {
          test: /\.js$/,
          exclude: /node_modules/, // 不编译node_modules下的文件
          loader: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: ['vue-loader']
        }
     ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),  // 要使用的 html 模板
      filename: 'index.html',   // 打包输出的文件名
      title: '手搭 vue 开发环境'  // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量

    }),
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin(),
  ]
}