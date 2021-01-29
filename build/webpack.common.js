"use strict";
var webpack = require("webpack");
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, "../", dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
    process.env.NODE_ENV === "production"
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    chunkFilename: '[name].js'
  },
  resolve: {
    /* 自动解析确定的扩展,频率高的文件尽量写在前面 */
    extensions: [".js", ".vue", ".json"],
    // 别名
    alias: {
      vue$: "vue/dist/vue.cjs.js",
      "@": resolve("src")
    }
  },
  plugins: [new VueLoaderPlugin()],
  target: 'web', // webpack5.x 加上之后热更新才有效果
  module: {
    rules: [
      // eslint 配置是否需要开启检验
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(js|jsx)$/,
        use: ['cache-loader', 'babel-loader'],
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.vue$/,
        use: [
          'cache-loader',
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false // 不想让元素和元素之间有空格
              },
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   loader: "babel-loader",
      //   exclude: /node_modules/,
      //   include: [resolve('src'), resolve('test')]
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024 // 4M----小于4M表现形式为baser64 大于4M就是 模块文件会被生成到输出的目标目录
          }
        },
        generator: {
          filename: utils.assetsPath('img/[name].[hash:5][ext]') // [ext]代表文件后缀
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024 // 4M
          }
        },
        generator: {
          filename: utils.assetsPath('media/[name].[hash:5][ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 * 1024 // 4M
          }
        },
        generator: {
          filename: utils.assetsPath('fonts/[name].[hash:5][ext]')
        }
      }
    ]
  },
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: "empty",
  //   fs: "empty",
  //   net: "empty",
  //   tls: "empty",
  //   child_process: "empty"
  // }
};