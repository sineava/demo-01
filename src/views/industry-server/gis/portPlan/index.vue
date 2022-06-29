<template>
  <iframe class="map" :src="url" />
</template>

<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      url: ''
    }
  },
  computed: {
    ...mapGetters(['user_info'])
  },
  created() {
    const userId = Number(this.user_info.userid)
    this.url = `http://122.112.230.245:31081/#/portPlan?userAccount=${getToken('user_account')}&tokenStr=${getToken('token_str')}&systemCode=${getToken('system_code')}&userId=${userId}`
  }
}
</script>

<style lang="scss" scoped>
.map {
    width: 100%;
    height: calc(100vh-118px);
}
</style>
