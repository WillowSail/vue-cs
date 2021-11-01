import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []
// 路由自动引入
const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 则不处理
  if (route.startsWith('./index')) {
    return
  }
  const routeModule = routerContext(route)
  // 兼容 import export 和 require module.export 两种规范
  routes = [...routes, ...(routeModule.default || routeModule)]
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
