const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const commonConfig = require("./webpack.common");

const config = require("./config");


module.exports = () => ({
    ...commonConfig(),
    mode: "development",
    devtool: "source-map",
    
    output: {
        path: config.assetsRoot,
        filename: config.assetsPublicPath + "js/[name].js",
        publicPath: config.BASE_PATH,
        chunkFilename: config.assetsPublicPath + 'js/[name].js'
    },
    plugins: [
        ...commonConfig().plugins,

        new CleanWebpackPlugin(),
    ],
    devServer: {
        open: false,
        // 使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: true,
        hot: true, // 启用 webpack 的模块热替换特性
        port: 8080,
    },
});
