<template>
  <el-steps
    :active="active"
    align-center
    process-status="process"
  >
    <el-step title="基础信息" />
    <el-step title="重庆市水路运输主要指标电讯月报" />
    <el-step title="运力情况增减变动" />
    <el-step title="内河货运月报" />
    <el-step title="港口月报" />
  </el-steps>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: () => 1
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-step .el-step__head {
    display: flex;
    justify-content: center;
    align-items: center;
}

/deep/ .el-step .el-step__title {
    font-size: 14px;
    white-space: pre-line;
}

/deep/ .el-step__title {
    font-weight: none;
    color: #aaaaaa;
}

/deep/ .el-step__title.is-finish {
    font-weight: 700;
    color: #666666;
}

/deep/ .el-step__icon {
    border: none;
    width: 40px;
    height: 40px;
}

/deep/ .el-step__head .el-step__icon {
    color: #ffffff;
    background-color: #aaaaaa;
}

/deep/ .el-step__head.is-finish .el-step__icon {
    color: #ffffff;
    background-color: #409eff;
}

/deep/ .el-step.is-horizontal .el-step__line {
    top: 20px;
}
</style>
