<template>
  <el-card class="box-card ifram" :style="`height:${height}px`">
    <iframe
      v-if="src"
      id="template-iframe"
      ref="iframe"
      class="map"
      :src="src"
      :style="`height:${height-40}px`"
      @load="loaded"
    />
    <el-empty v-else description="外链地址异常" />
    <!-- <iframe class="map" :src="url" :style="`height:${height-40}px`" /> -->
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import store from '@/store'
export default {
  data() {
    return {
      src: '',
      height: 500,
      iframeWin: {}
    }
  },
  computed: {
    ...mapGetters(['user_info']),
  },
  mounted () {
    this.init()
  },
  created() {
    this.height = document.body.clientHeight - 120
  },
  methods: {
    init(){
      const outKey = this.$route.query.outKey
      if (outKey){
        const url = getToken(outKey)
        const userId = Number(this.user_info.userid)
        this.src = `${url}?userAccount=${getToken('user_account')}&tokenStr=${getToken('token_str')}&systemCode=${getToken('system_code')}&user=${userId}`
      }
    },
    loaded() {
      // 接受子级返回数据
      window.addEventListener('message',(e) => {
        const data = e.data
        switch (data.type) {
        case 'loginout': // 退出登录
          store.dispatch('user/logout')
          break
        default:
          break
        }
      },false)
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
    border: 0;
    width: 100%;
}
</style>
