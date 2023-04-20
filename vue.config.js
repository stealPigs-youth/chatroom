const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true, 
          pathRewrite:{"^/api":""} 
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? './': '/'

})
