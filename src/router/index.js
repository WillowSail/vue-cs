import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@styles/nprogress.scss' // 自定义进度条样式
NProgress.configure({ showSpinner: false, minimum: 0.1 }) // 取消加载环

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

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
// 全局后置导航守卫
router.afterEach(() => {
  NProgress.done()
})

export default router
