const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development", // 环境模式
    devtool: "source-map",
    entry: path.resolve(__dirname, "./src/main.js"), // 打包入口
    output: {
        path: path.resolve(__dirname, "dist"), // 打包出口
        filename: "js/[name].js", // 打包完的静态资源文件名
    },

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
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: "babel-loader",
            },
            {
                test: /\.vue$/,
                use: ["vue-loader"],
            },
        ],
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"), // 要使用的 html 模板
            filename: "index.html", // 打包输出的文件名
            title: "手搭 vue3 开发环境", // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
        }),
        // 添加 VueLoaderPlugin 插件
        new VueLoaderPlugin(),
        
        // new webpack.HotModuleReplacementPlugin(),

        new CleanWebpackPlugin(),
    ],
    devServer: {
        // 使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: true,  
        hot: true,  // 启用 webpack 的模块热替换特性
        contentBase: path.join(__dirname, "public"),    // 静态文件
        port: 8080,
        // compress: true, // 一切服务都启用gzip 压缩
        publicPath: "/",
    },
};
