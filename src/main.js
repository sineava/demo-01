import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import '@/icons'
import '@/permission'

import Vue from 'vue'
import ElementUI from 'element-ui'
import VueDND from 'awe-dnd'

import App from './App'
import store from './store'
import router from './router'

import { returnBack } from './utils/index.js'

import rightMenu from 'rightmenu'

Vue.use(VueDND)
Vue.use(ElementUI)
Vue.use(rightMenu)
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })
// 注册一个返回事件
Vue.prototype.returnBack = returnBack

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
