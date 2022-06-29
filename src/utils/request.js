import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' })
})

// 报错统一处理,避免多组件重复报错
let timer = null
const handleMsg = (err = 'Error') => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    Message({
      message: err,
      type: 'error',
      duration: 5000
    })
  }, 200) 
}

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.state.user.token_str) {
      // config.headers['Accept'] = 'application/xml;q=0.9,image/avif,*/*'
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.headers['tokenStr'] = getToken('token_str')
      config.headers['userAccount'] = getToken('user_account')
      config.headers['systemCode'] = getToken('system_code')
      config.headers['contextHolder'] = getToken('user_id')
      if (config.method === 'get') {
        config.data = {unused: 0} // 这个是关键点，加入这行就可以了  解决get  请求添加不上content_type
      }
    }
    if (config.method === 'get') {
      config.data = {unused: 0} // 这个是关键点，加入这行就可以了  解决get  请求添加不上content_type
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== '0') {
      const msg = res.possibleReason || res.message
      if (!response.config.isErrMsg){
        handleMsg(msg)
      }
    }
    return res
  },
  error => {
    if (error && error.response) {
      if ([403, 405].includes(error.response.status)) {
        handleMsg('登录失效')
        store.dispatch('user/logout')
      } else if (error.response.status === 500) {
        if (!error.response.config.isErrMsg){
          handleMsg('网络异常')
        }
      } else {
        if (!error.response.config.isErrMsg){
          handleMsg(error.possibleReason || error.message)
        }
      }
    }
  }
)

export default service
