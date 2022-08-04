const path = require("path");

module.exports = {
    assetsRoot: path.join(__dirname, "../dist"),   // 打包地址
    assetsSubDirectory: "assets/",                 // 打包 图片地址
    assetsPublicPath: "assets/",                   // 打包 js 地址
    BASE_PATH: "/"
}