<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水运专职管理人员详情" />
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
      <el-descriptions-item label="姓名:">{{ info.fullName }}</el-descriptions-item>
      <el-descriptions-item label="所在企业:">{{ info.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="企业类型:">{{ info.enterpriseTypeName }}</el-descriptions-item>
      <el-descriptions-item label="所属港航机构:">{{ info.organizationName }}</el-descriptions-item>
      <el-descriptions-item label="性别:">{{ info.sexName }}</el-descriptions-item>
      <el-descriptions-item label="身份证号:">{{ info.identificationNumber }}</el-descriptions-item>
      <el-descriptions-item label="职务:">{{ info.post }}</el-descriptions-item>
      <el-descriptions-item label="适任证书类型:">{{ info.certificateType }}</el-descriptions-item>
      <el-descriptions-item label="适任证书编号:">{{ info.certificateCode }}</el-descriptions-item>
      <el-descriptions-item label="联系电话:">{{ info.contactNumber }}</el-descriptions-item>
      <el-descriptions-item label="联系地址:">{{ info.contactAddress }}</el-descriptions-item>
      <el-descriptions-item label="聘用合同至:">{{ info.contractEndDate }}</el-descriptions-item>
      <el-descriptions-item label="聘用合同起:">{{ info.contractStartDate }}</el-descriptions-item>
      <el-descriptions-item label="所在部门:">{{ info.departmentName }}</el-descriptions-item>
      <el-descriptions-item label="更新时间:">{{ info.updateTime }}</el-descriptions-item>
      <el-descriptions-item label="备注:" :span="3">{{ info.remark }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    }
  },
  async created() {
    this.info = JSON.parse(localStorage.getItem('staffDetail')) || {};
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
