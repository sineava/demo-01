<template>
  <div :class="[column, disabled ? 'detail' : '', 'wrapper']">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    }
  }
}
</script>

<style lang="scss" scoped>
// 兼容新增/编辑
.wrapper {
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    flex-wrap: wrap;

    &.one .el-form-item {
        width: 100%;
    }

    &.two .el-form-item {
        width: 50%;
    }

    &.three .el-form-item {
        width: 33.3%;
        white-space: pre-line;
    }
}

</style>
