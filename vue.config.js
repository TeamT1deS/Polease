const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081', // 目标 API 服务器
        changeOrigin: true, // 允许跨域
        pathRewrite: { '^/api': '' } // 去掉前缀，如果需要
      }
    }
  },
  // configureWebpack: {
  //   resolve: {
  //     fallback: {
  //       path: require.resolve('path-browserify'),
  //       // util: require.resolve('util/'),
  //     },
  //   },
  // },
  transpileDependencies: [
    'vuetify'
  ]
})
