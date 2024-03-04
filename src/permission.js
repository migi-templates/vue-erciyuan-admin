import router from '@/router'
import { mainStore } from '@/store/index'
import { layoutStore } from '@/store/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // 进度条

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const store = mainStore()

  if (to.meta.title) {
    document.title = '上优 -' + to.meta.title
  }

  if (store.token) {
    if (to.path === '/login') {
      next('/') // 如果已登录且目标是登录页，重定向到首页
    } else {
      const layoutstore = layoutStore()
      const accessedRoutes = await layoutstore.generateRoutes()
      accessedRoutes.forEach((route) => {
        router.addRoute(route)
      })
      if (to.name === '404') {
        next({ path: to.path })
      } else {
        if (layoutstore.concatRoutes == 0) {
          next({ ...to, replace: true })
        } else {
          next() // 如果已登录且目标不是登录页，正常进入
        }
      }
      // console.log('to', to)
      // console.log('from', from)
    }
  } else {
    if (to.path !== '/login') {
      next('/login') // 如果未登录且目标不是登录页，重定向到登录页
    } else {
      next() // 如果未登录但目标已是登录页，正常进入
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
