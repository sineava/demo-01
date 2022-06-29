<template>
  <div class="head">
    <div class="head-content">
      <img class="logo" src="../../assets/new-system/logo.png" @click="toSystem">
      <div class="head-log">
        <div class="head-name" @click="toPersonal"> <img src="../../assets/new-system/user.png"> {{ user_info.username }}</div>
        <span @click="logout">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  methods: {
    // 进入系统门户
    toSystem() {
      this.$router.push({ path: `/` })
    },
    /**
     * 退出
     */
    async logout() {
      this.$confirm('是否退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('user/logout')
      }).catch(() => {
        // 几点取消的提示
      })
    },
    // 个人中心
    toPersonal() {
      this.$router.push({ path: '/system/personal' })
    }
  }
}
</script>
<style lang="scss" scoped>
.head {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 68px;
    background: #ffffff;

    .head-content {
        display: flex;
        margin: 0 auto;
        width: 1200px;
        height: 68px;
        align-items: center;
        justify-content: space-between;

        .logo {
            width: 317px;
            height: 48px;
            cursor: pointer;
        }

        .head-log {
            display: flex;
            font-size: 14px;
            align-items: center;

            .head-name {
                display: flex;
                cursor: pointer;
                align-items: center;
            }

            img {
                margin-right: 6px;
                width: 13px;
                height: 15px;
            }

            span {
                margin-left: 12px;
                color: #3e95fc;
                cursor: pointer;
            }
        }
    }
}
</style>
