<template>
  <div id="home-content" class="system-container">
    <basic-head v-if="isLogin" />
    <basic-menu v-if="isLogin" :index="1" @refresh="refresh" />
    <Gateway v-if="isLogin" ref="gateway" />
    <loading ref="load" />
  </div>
</template>

<script>
import BasicHead from '@/components/BasicHead'
import BasicMenu from '@/components/BasicMenu'
import Gateway from '../gateway'
import {getToken} from '@/utils/auth'
import router from '../../../router'
import Loading from '@/components/loading'

export default {
  components: {
    BasicHead,
    BasicMenu,
    Gateway,
    Loading
  },
  data() {
    return {
      isLogin:false,
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        this.init()
      }
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    refresh() {
      this.$refs.gateway.refresh()
    },
    async init(){
      // 设置token数据
      this.isLogin = getToken('token_str') ? true : false
      // token 不存在退出登录
      if (!this.isLogin) {
        this.$store.dispatch('user/logout')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#home-content {
    overflow-y: auto;
    width: 100%;
    height: 100vh;
    background: url('../../../assets/bg.jpg');
}
</style>
