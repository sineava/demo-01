<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="企业制度详情" />
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
      <el-descriptions-item label="文件名:">{{ info.fileName }}</el-descriptions-item>
      <el-descriptions-item label="制度类型:">{{ info.systemTypeName }}</el-descriptions-item>
      <el-descriptions-item label="适用机构:">{{ info.departmentName }}</el-descriptions-item>
      <el-descriptions-item label="编制时间:">{{ info.expiryStartDate }}</el-descriptions-item>
      <el-descriptions-item label="编制部门:">{{ info.organizationName }}</el-descriptions-item>
      <el-descriptions-item label="编制负责人:">{{ info.directorName }}</el-descriptions-item>
      <el-descriptions-item label="联系电话:">{{ info.phone }}</el-descriptions-item>
      <el-descriptions-item label="有效期至:">{{ info.expiryEndDate }}</el-descriptions-item> 
      <el-descriptions-item label="文件页数:">{{ info.fileTotalPages }}</el-descriptions-item>
      <el-descriptions-item label="企业名称:">{{ info.enterpriseName }}</el-descriptions-item>
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
    this.info = JSON.parse(localStorage.getItem('systemDetail'))
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
