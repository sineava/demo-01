<!--
 * @Author: your name
 * @Date: 2021-02-20 15:52:06
 * @LastEditTime: 2021-02-24 15:49:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \cocp-frontend-scaffold\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
    overflow: hidden;
    position: relative;
    margin: 50px 0;
    width: 100%;

    /* 50 = navbar  */
    min-height: calc(100vh - 50px - 68px);
    background-color: rgba(236, 239, 244, 0.996078431372549);
}

.fixed-header + .app-main {
    padding-top: 50px;
}
</style>

<style lang="scss" scoped>
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
