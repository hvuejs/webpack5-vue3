const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require("./webpack.common");
const config = require("./config");

module.exports = () => ({
    ...commonConfig(),
    mode: "production", // 环境模式
    output: {
        // path: path.resolve(__dirname, "../dist"), // 打包出口
        // filename: "assets/js/[name].js", // 打包完的静态资源文件名

        path: config.assetsRoot,
        filename: config.assetsPublicPath +"js/[name].js",
        publicPath: config.BASE_PATH,
        chunkFilename: config.assetsPublicPath + 'js/[name].js'
    },    
    plugins: [
       ...commonConfig().plugins,

        // 复制自定义的静态文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "../public"),
                    to: path.join(__dirname, '../dist'),
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

        new CleanWebpackPlugin(),
    ],
});
