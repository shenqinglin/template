import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
  // 进度条
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
