const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = {
    mode: "none", // 环境模式
    entry: path.resolve(__dirname, "./src/main.js"), // 打包入口
    output: {
        path: path.resolve(__dirname, "dist"), // 打包出口
        filename: "assets/js/[name].js", // 打包完的静态资源文件名
    },
    target: ['web', 'es5'],
    resolve: {
        /* 自动解析确定的扩展,频率高的文件尽量写在前面 */
        extensions: [".js", ".vue", ".json"],
        // 别名
        alias: {
            "@": path.resolve("src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"],
            },
            {
                test: /\.less$/i,
                use: [stylesHandler, "css-loader", "postcss-loader", 'less-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader" ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"), // 要使用的 html 模板
            filename: "index.html", // 打包输出的文件名
            title: "手搭 vue3 开发环境", // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
        }),
        // 添加 VueLoaderPlugin 插件
        new VueLoaderPlugin(),

        new MiniCssExtractPlugin(
            {
                filename: 'assets/css/[name].[contenthash:8].css',
                chunkFilename: 'assets/css/[id].[contenthash:8].css'
            }
        ),

        // 复制自定义的静态文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public"),
                    to: path.resolve(__dirname, './dist'),
                    globOptions: {
                        dot: true,
					    gitignore: false,
                        ignore: [
                            "**/index.html"
                        ],
                    },
                },
            ],
        }),

        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["dist"]
        }),
    ],
};
