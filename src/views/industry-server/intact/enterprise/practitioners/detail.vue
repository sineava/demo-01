<template>
  <el-card class="body-card">
    <div slot="header" class="clearfix">
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口从业人员详情" />
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
      <el-descriptions-item label="员工姓名:">{{ info.fullName }}</el-descriptions-item>
      <el-descriptions-item label="性别:">{{ info.sexName }}</el-descriptions-item>
      <el-descriptions-item label="人员类别:">{{ info.personTypeName }}</el-descriptions-item>
      <el-descriptions-item label="所在企业:">{{ info.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="所属港航机构:">{{ info.departmentName }}</el-descriptions-item>
      <el-descriptions-item label="岗位:">{{ info.position }}</el-descriptions-item>
      <el-descriptions-item label="移动电话:">{{ info.phone }}</el-descriptions-item>
      <el-descriptions-item label="持证类型:">{{ info.certificateType }}</el-descriptions-item>
      <el-descriptions-item label="证书名称:">{{ info.certificateName }}</el-descriptions-item>
      <el-descriptions-item label="证书有效期至:">{{ info.validityDate }}</el-descriptions-item>
      <el-descriptions-item label="通过日期:">{{ info.adoptDate }}</el-descriptions-item>
      <el-descriptions-item label="出生年月日:">{{ info.birthDate }}</el-descriptions-item>
      <el-descriptions-item label="证书颁发机构:">{{ info.certificateAuthority }}</el-descriptions-item>
      <el-descriptions-item label="证书编号:">{{ info.certificateCode }}</el-descriptions-item>
      <el-descriptions-item label="证书有效期至:">{{ info.validityDate }}</el-descriptions-item>
      <el-descriptions-item label="证书图片:" :span="3">
        <div v-if="info.certificateImg&&info.certificateImg.length" style="display: flex;flex-wrap:wrap">
          <el-image 
            style="width: 100px; height: 100px;margin:0 10px 10px 0"
            v-for="item, index in info.certificateImg"
            :key="index"
            :src="item" 
            :preview-src-list="info.certificateImg">
          </el-image>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="证书颁发日期:">{{ info.certificateIssueDate }}</el-descriptions-item>
      <el-descriptions-item label="电子邮箱:">{{ info.email }}</el-descriptions-item>
      <el-descriptions-item label="安全管理人员能力是否通过:">{{Number(info.isAdopt) === 1 ? '是':'否' }}</el-descriptions-item>
      <el-descriptions-item label="专业方向:">{{ info.majorDirection }}</el-descriptions-item>
      <el-descriptions-item label="办公电话:">{{ info.officeTelephone }}</el-descriptions-item>
      <el-descriptions-item label="职务:">{{ info.post }}</el-descriptions-item>
      <el-descriptions-item label="人员照片:" :span="3">
         <el-image 
            v-if="info.personImg"
            style="width: 100px; height: 100px;"
            :src="info.personImg" 
            :preview-src-list="[info.personImg]">
          </el-image>
      </el-descriptions-item>
      <el-descriptions-item label="所在企业组织机构名称:" :span="3">{{ info.organizationName }}</el-descriptions-item>
      <el-descriptions-item label="备注:">{{ info.remark }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<script>
import { fileUrlAssemble } from '@/utils/index'
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const x = JSON.parse(localStorage.getItem('practitionersDetail')) || {}
    this.info = {
      ...x,
      personImg: await fileUrlAssemble(x.personImg),
      certificateImg: await Promise.all(JSON.parse(x.certificateImg || '[]').map(async (y) => await fileUrlAssemble(y.url)))
    }
    console.log(this.info)
  },
}
</script>
<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 12%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
        word-break: break-all;
    }
}
</style>
