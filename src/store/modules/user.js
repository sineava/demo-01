import { login, getInfo } from '@/api/user'
import { findByUserId } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { getLoginUrl } from '@/utils/evn'
import store from '@/store'
// import { resetRouter } from '@/router'
import enterprise from '@/router/enterprise'
import industry from '@/router/industry'

const systemCode = 'ghnwmh'
const otherCode = 'ghnwmh'

const getDefaultState = () => {
  return {
    token_str: getToken('token_str'),
    user_account: getToken('user_account'),
    system_code: getToken('system_code'),
    name: '',
    avatar: '',
    roles: [],
    results: [],
    buttonRoles: {},
    enterprise: {},
    user_info: [{}],
    systemRole: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // 添加用户信息
  SET_SYSTEM_CODE: (state, systemCode) => {
    state.system_code = systemCode
  },
  SET_USER_ACCOUNT: (state, userAccount) => {
    state.user_account = userAccount
  },
  SET_TOKEN_STR: (state, tokenStr) => {
    state.token_str = tokenStr
  },
  SET_USER_INFO: (state, userInfo) => {
    state.user_info = userInfo && userInfo.length > 0 ? userInfo : [{}]
  },
  SET_RESULTS: (state, results) => {
    state.results = results
  },
  SET_ROLE_INFO: (state, roleInfo) => {
    state.role_info = roleInfo
  },
  SET_BUTTON_ROLES: (state, roles) => {
    state.buttonRoles = roles
  },
  SET_ENTERPRISE: (state, enterprise) => {
    state.enterprise = enterprise
  },
  SET_SYSTEM_ROLE: (state, role) => {
    state.systemRole = role
  },
}

const users = {
  'admin-token': {
    router: industry
  },
  'editor-token': {
    router: enterprise
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userAccount: username.trim(), userPwd: password, systemCode, otherCode }).then(response => {
        // 记住密码
        if (userInfo.checked) {
          setToken('userInfo', userInfo)
        } else {
          removeToken('userInfo')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 设置token等信息
   */
  setUserInfo({ commit }, data) {
    setToken('token_str', data.tokenStr)
    setToken('user_account', data.userAccount)
    setToken('system_code', data.systemCode)
    commit('SET_SYSTEM_CODE', data.systemCode)
    commit('SET_USER_ACCOUNT', data.userAccount)
    commit('SET_TOKEN_STR', data.tokenStr)
  },

  /**
   * 设置门户菜单列表
   */
  setSystemRole({ commit }, data) {
    commit('SET_SYSTEM_ROLE', data)
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ systemCode: state.system_code, userAccount: state.user_account, tokenStr: state.token_str }).then(response => {
        const { data } = response
        if (!data) {
          reject(new Error('Verification failed, please Login again.'))
        }
        let roles = null
        if (data.userInfo[0].usercategory === '1') roles = ['admin']
        if (data.userInfo[0].usercategory === '2') {
          roles = ['editor']
          findByUserId().then(res => {
            commit('SET_ENTERPRISE', res.data)
          })
        }
        if (!roles || roles.length <= 0) {
          reject(new Error('getInfo: roles must be a non-null array!'))
        }
        const token = roles[0] === 'admin' ? 'admin-token' : 'editor-token'
        commit('SET_ROLES', roles)
        commit('SET_NAME', data.userInfo[0].username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_USER_INFO', data.userInfo)
        commit('SET_RESULTS', data.results)
        commit('SET_ROLE_INFO', data.roleInfo)
        setToken('user_id', data.userInfo[0].userid)
        resolve({ token, router: [...users[token].router] })
      }).catch(error => {
        reject(error)
      })
    })
  },

  removeRole({ commit, state }) {
    commit('SET_ROLES', [])
  },

  // user logout
  logout({ commit }) {
    store.dispatch('user/resetToken').then(() => {
      commit('RESET_STATE')
      removeToken('token_str') // must remove  token  first
      removeToken('user_account')
      removeToken('system_code')
      removeToken('user_id')
      sessionStorage.removeItem('vuex')
      /*
       * if (store.state.permission.addRoutes.length > 0) { // 判断是否已经刷新
       *   window.location.href = '/#/'
       *   location.reload()
       * }
       */
      window.location.href = getLoginUrl() // process.env.VUE_APP_LOGIN_URL
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken('token_str') // must remove  token  first
      removeToken('user_account')
      removeToken('system_code')
      removeToken('user_id')
      resolve()
    })
  },

  // 设置按钮权限
  setButtonRole({ commit }, role) {
    return new Promise(resolve => {
      commit('SET_BUTTON_ROLES', role)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

