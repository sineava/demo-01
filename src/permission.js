/*
 * @Author: your name
 * @Date: 2021-02-20 15:52:06
 * @LastEditTime: 2021-03-02 15:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cocp-frontend-scaffold\src\permission.js
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getRouterButtonRole } from '@/utils/index'
import { getLoginUrl } from '@/utils/evn'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  const { userAccount, tokenStr, systemCode } = to.query
  const data = {
    tokenStr,
    userAccount,
    systemCode
  }
  if (data.tokenStr){
    await store.dispatch('user/setUserInfo', data)
    window.location.href = '/'
  }
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged i n
  const hasToken = getToken('token_str')
  // if (!hasToken){
  //   store.dispatch('user/logout')
  // }
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        await getRouterButtonRole(to.path)
        next()
      } else {
        try {
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')

          // window.location.href = getLoginUrl() // process.env.VUE_APP_LOGIN_URL
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('user/logout')
      // window.location.href = getLoginUrl() // process.env.VUE_APP_LOGIN_URL
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
