// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const stylesHandler = MiniCssExtractPlugin.loader;

const { VueLoaderPlugin } = require("vue-loader");
const config = require("./config");

const base_url = "/";

const configCommon = {
    entry: path.join(__dirname, "../src/main.ts"),
    target: ["web", "es5"],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: ["/node_modules/"],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, "../tsconfig.json"),
                            // 对应文件添加个.ts或.tsx后缀
                            appendTsSuffixTo: [/\.vue$/],
                            // transpileOnly: true, // ? 关闭类型检查，即只进行转译
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"],
            },
            {
                test: /\.less$/i,
                use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024 * 1024, // 2M----小于2M表现形式为baser64 大于2M就是 模块文件会被生成到输出的目标目录
                    },
                },
                generator: {
                    publicPath: "../../",
                    filename: config.assetsSubDirectory + "img/[name].[hash:5][ext]", // [ext]代表文件后缀
                },
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    plugins: [
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../public/index.html"), // 要使用的 html 模板
            filename: "index.html", // 打包输出的文件名
            title: "手搭 vue3 开发环境", // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
            inject: "body",
        }),
        new webpack.DefinePlugin({
            BASE_URL: `'${base_url}'`,
            // __VUE_OPTIONS_API__: false, // 是否支持optionsApi
            // __VUE_PROD_DEVTOOLS__: false // 在生成环境是否支持devtools
        }),

        new MiniCssExtractPlugin(
            {
                filename: config.assetsSubDirectory + 'css/[name].[contenthash:8].css',
                chunkFilename: config.assetsSubDirectory + 'css/[id].[contenthash:8].css'
            }
        ),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".vue", ".json"],
        alias: {
            "@": path.resolve("src"),
        },
    },
};
// const isProduction = process.env.NODE_ENV == "production";
// () => {
//     if (isProduction) {
//         config.mode = "production";
//     } else {
//         config.mode = "development";
//     }
//     return config;
// };

module.exports = () => configCommon;
