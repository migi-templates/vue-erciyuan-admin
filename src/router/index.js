import { createRouter, createWebHistory } from 'vue-router'

// history: 替换模式
// createWebHistory  history 历史模式
// createWebHashHistory  hash /#/ 哈希模式
export const constantRoutes = [
  {
    path: '/',
    name: '/',
    meta: {
      title: '主页',
    },
    redirect: '/home',
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: "homepage",
          title: '首页',
          hidden: false,
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/login', // 默认显示这个路由 的 页面组件
    name: 'Login',
    meta: {
      title: '登录页',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  // {
  //   meta: {
  //     hidden: false,
  //     title: '系统管理',
  //   },
  //   component: () => import('@/Layout/index.vue'),
  //   name: '/system',
  //   path: '/system',
  //   redirect: '/system/two',
  //   children: [
  //     {
  //       name: 'Two',
  //       path: 'two',
  //       meta: {
  //         hidden: false,
  //         keepAlive: true,
  //         title: '用户管理',
  //       },
  //       component: () => import('@/views/two/index.vue'),
  //     },
  //   ],
  // }
  {
    name: '404',
    path: '/:catchAll(.*)',
    component: () => import(`@/views/404.vue`)
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' });
  location.reload();
}

export default router
