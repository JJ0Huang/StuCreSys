const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: '8081',
    proxy: {
      '/api': {
        target: 'http://localhost:8083/g628',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"))
      .set("base", resolve("baseConfig"))
      .set("api", resolve("src/api"))
      .set("public", resolve("public"));
  },
}