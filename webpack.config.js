// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const stylesHandler = MiniCssExtractPlugin.loader;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    entry: path.join(__dirname, "lib/index.js"),
    target: ["web", "es5"],
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "dayjs",
        libraryTarget: "umd",

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // 不编译node_modules下的文件
                loader: "babel-loader",
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
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),

        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".js", "..."],
    },
};
const isProduction = process.env.NODE_ENV == "production";

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
        config.devtool = "source-map"
    }
    return config;
};
