<!--
 * @Author: your name
 * @Date: 2021-02-24 11:46:24
 * @LastEditTime: 2021-02-25 15:40:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cocp-frontend-scaffold\src\components\SpeedOfProgress\index.vue
-->
<template>
  <span v-loading.fullscreen.lock="fullscreenLoading" />
</template>

<script>

export default {
  name: 'Loading',
  data() {
    return {
      fullscreenLoading: false
    }
  },
  methods: {
    open() {
      this.fullscreenLoading = true
    },
    close() {
      this.fullscreenLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.speed {
    margin: 50px 0 30px 0;
    font-size: 16px;
    text-align: center;
    color: #999999;
}
</style>>
