<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="营运船舶详情" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" />基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="船舶名称:">{{ info.shipName }}</el-descriptions-item>
      <el-descriptions-item label="船舶经营人:">{{ info.shipOperator }}</el-descriptions-item>
      <el-descriptions-item label="所在地市港口管理部门:">{{ info.organizationName }}</el-descriptions-item>
      <el-descriptions-item label="船舶识别号:">{{ info.shipIdentifyNo }}</el-descriptions-item>
      <el-descriptions-item label="船舶类型:">{{ info.shipType }}</el-descriptions-item>
      <el-descriptions-item label="运营证编号:">{{ info.shipLicenseNo }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    this.info = JSON.parse(localStorage.getItem('operatingDetail')) || {};
  }
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }
}
</style>
