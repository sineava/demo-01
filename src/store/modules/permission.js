import { constantRoutes } from '@/router'
import store from '../../store'
import Layout from '@/layout'
import { loadView, assembleRouter } from '@/utils/index'
import { funcMenuAccount } from '@/api/user'
const state = {
  routes: [],
  addRoutes: [],
  firstPath: '',
  menu: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_FIRSTPATH: (state, path) => {
    state.firstPath = path
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // 获取菜单
  async getMenu({ commit }) {
    const { user_account, user_info, token_str } = store.state.user
    const res = await funcMenuAccount({ userAccount: user_account, systemId: user_info[0].systemid, tokenStr: token_str })
    const routers = await assembleRouter(res.data)
    // 获取第一个路由地址
    let firstAddress = routers && routers.length>0 ? routers[0].children[0].children.length > 0 ? routers[0].children[0].children[0].path : routers[0].children[0].path : ''
    commit('SET_FIRSTPATH', firstAddress)
    commit('SET_MENU', routers)
    return routers
  },
  async generateRoutes({ commit }, roles) {
    // 本地详情添加等非菜单路由
    let { router } = await store.dispatch('user/getInfo')
    // 左侧菜单路由组装
    let leftMenu = await store.dispatch('permission/getMenu')

    router.forEach(item => {
      item.component = Layout
      if (item.children && item.children.length > 0) {
        item.children.forEach(secondItem => {
          secondItem.component = loadView(secondItem.component)
          if (secondItem.children && secondItem.children.length > 0) {
            secondItem.children.forEach(thirdItem => {
              thirdItem.component = loadView(thirdItem.component)
            })
          }
        })
      }
    })
    leftMenu.forEach(item => {
      router.push(item)
    })
    router.push({
      path: '*',
      redirect: '/404'
    })
    return new Promise(resolve => {
      commit('SET_ROUTES', router)
      resolve(router)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
