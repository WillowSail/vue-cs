'use strict'
const path = require('path')
// 定位路径使用，之后我们使用时 resolve(dir) 就会自动生成到该 dir 目录的路径。
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 自己的应用名称
const name = 'vue demo'
module.exports = {
  /**
  * 如果您打算在子路径下部署站点，则需要设置 publicPath，
  * 例如 GitHub 页面。 如果您打算将站点部署到  https://foo.github.io/bar/，
  * 那么 publicPath 应该设置为“/bar/”。
  * 大多数情况下请使用'/' !!!
  * 详情：https://cli.vuejs.org/config/#publicpath
  */
  publicPath: '/',
  // 打包输出路径名
  outputDir: 'dist',
  // 金泰文件路径名称
  assetsDir: 'static',
  // 在生产模式中不会将eslint-loader的报错信息展示在页面上
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 不需要生产环境的 source map，以加速生产环境构建
  productionSourceMap: false,
  // webpack-dev-server 的配置
  devServer: {
    // 端口号设置为 3000
    port: 3000,
    // 自动打开浏览器
    open: true
  },
  // 设置Webpack配置
  configureWebpack: {
    // 在 webpack 的名称字段中提供应用程序的标题，以便它可以在 index.html 中访问以注入正确的标题。
    name: name,
    // 配置快捷引用路径路径
    resolve: {
      alias: {
        '@': resolve('src'),
        '@views': resolve('src/views'),
        '@styles': resolve('src/assets/styles')
      }
    }
  },
  // 修改Webpack配置
  chainWebpack(config) {
    // 可以提高首屏速度，提前预加载提高切换路由的体验
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 页面多的时候，会造成太多无意义的请求,把 runtime 代码的 preload 去掉。
    config.plugins.delete('prefetch')

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          // 使用 script-ext-html-webpack-plugin 插件将其内链在 index.html ,需要下载
          // yarn add -D html-webpack-plugin script-ext-html-webpack-plugin
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` 必须与 runtimeChunk 名称相同。 默认是`运行时`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          // 设定 runtime 代码单独抽取打包
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/styles/variables";`
      }
    }
  }
}
