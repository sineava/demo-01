/*
 * @Author: your name
 * @Date: 2021-02-20 15:52:06
 * @LastEditTime: 2021-03-02 17:34:38
 * @LastEditors: lee
 * @Description: In User Settings Edit
 * @FilePath: \cocp-frontend-scaffold\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    name: 'Gateway',
    component: () => import('@/views/system-portal/index/index'),
    meta: { title: '系统门户',keepAlive: false },
    hidden: true
  },
  {
    path: '/system/notice',
    name: 'SystemNotice',
    component: () => import('@/views/system-portal/notice/index'),
    meta: { title: '信息通知' },
    hidden: true
  },
  {
    path: '/system/personal',
    name: 'SystemPersonal',
    component: () => import('@/views/system-portal/personal/index'),
    meta: { title: '个人中心' },
    hidden: true
  },
  {
    path: '/system/manage',
    name: 'SystemManage',
    component: () => import('@/views/system-portal/column/index'),
    meta: { title: '系统管理' },
    hidden: true
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/system-portal/gateway/edit'),
    meta: { title: '快捷菜单' },
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
