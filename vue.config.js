const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  /*修改端口*/
  devServer: {
    port: 8080
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()]
  }
};
