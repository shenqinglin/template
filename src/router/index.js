import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Request from '@/utils/request'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV !== 'development' ? '/activity' : '/',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = 100
      }
      return { x: 0, y: to.meta.savePosition || 0 }
    }
  }
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  // 如果存在title，则赋值
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 微信浏览器校验
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    // 微信浏览器处理
  }
  Request.cancel()
  // 进度条
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
