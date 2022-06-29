<template>
  <div class="app-detail">
    <div
      ref="obtain"
      :class="['bottom-text', isAbsolute ? 'absolute' : '']"
    >
      Copyright © 港口综合管理系统, All Rights Reserved.<br> 企业服务管理系统
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAbsolute: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (document.body.clientHeight - (window.pageYOffset + this.$refs.obtain.getBoundingClientRect().top) > 60) {
        this.isAbsolute = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-detail {
    background-color: #ffffff;

    .bottom-text {
        margin: 20px 0;
        width: 100%;
        height: 60px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        color: #cccccc;

        &.absolute {
            position: absolute;
            bottom: 0;
        }
    }
}
</style>
