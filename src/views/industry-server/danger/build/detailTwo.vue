<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="建设项目信息详情页" />
      </span>
      <span class="detail-header-button">
        <el-button :type="tabIndex===1?'primary':''" size="small" @click="tabIndex=1">基本信息</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="small" @click="tabIndex=2">组织机构</el-button>
      </span>
    </div>
    <div v-show="tabIndex===1" class="basic-detail">
      <div class="icon-title">
        <span class="span" />建设项目基本信息
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
        <el-descriptions-item label="项目名称:">{{ ruleForm.projectName }}</el-descriptions-item>
        <el-descriptions-item label="邮政编码:">{{ ruleForm.postalCode }}</el-descriptions-item>
        <el-descriptions-item label="所在港口名称:">{{ ruleForm.portName }}</el-descriptions-item>
        <el-descriptions-item label="建设类别:">{{ ruleForm.type ? getTypes(ruleForm.type) : '' }}</el-descriptions-item>
        <el-descriptions-item label="工程地址:">{{ ruleForm.address }}</el-descriptions-item>
        <el-descriptions-item label="建设性质:">{{ ruleForm.nature ? getNature(ruleForm.nature) : '' }}</el-descriptions-item>
        <el-descriptions-item label="项目级别:">{{ ruleForm.projectLevel ? getProjectLevel(ruleForm.projectLevel) : '' }}</el-descriptions-item>
        <el-descriptions-item label="投资来源:">{{ ruleForm.investmentSource ? getInvestmentSource(ruleForm.investmentSource) : '' }}</el-descriptions-item>
        <el-descriptions-item label="立项部门级别:">{{ ruleForm.departmentLevel ? getDepartmentLevel(ruleForm.departmentLevel) : '' }}</el-descriptions-item>
        <el-descriptions-item label="计划总投资(万元):">{{ ruleForm.totalPlannedInvestment }}</el-descriptions-item>
        <el-descriptions-item label="计划总工期(月):">{{ ruleForm.planTotalDate }}</el-descriptions-item>
        <el-descriptions-item label="计划开工年月:">{{ momentDate(ruleForm.planStartDate,'YYYY-MM') }}</el-descriptions-item>
        <el-descriptions-item label="计划完工年月:">{{ momentDate(ruleForm.planEndDate,'YYYY-MM') }}</el-descriptions-item>
        <el-descriptions-item label="实际开工年月:">{{ momentDate(ruleForm.actualStartDate,'YYYY-MM') }}</el-descriptions-item>
        <el-descriptions-item label="实际完工年月:">{{ momentDate(ruleForm.actualEndDate,'YYYY-MM') }}</el-descriptions-item>
        <el-descriptions-item label="装卸/储存主要危险货物品名:" :span="3">{{ ruleForm.mainArticleName }}</el-descriptions-item>
        <el-descriptions-item label="建设项目概况:" :span="3">{{ ruleForm.generalSituation }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div v-show="tabIndex===2" class="basic-detail">
      <div class="icon-title">
        <span class="span" />组织机构
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
        <el-descriptions-item label="统一社会信用代码:" :span="2">{{ enForm.certificateNo }}</el-descriptions-item>
        <el-descriptions-item label="组织机构名称:">{{ enForm.name }}</el-descriptions-item>
        <el-descriptions-item label="类型:">{{ enForm.type }}</el-descriptions-item>
        <el-descriptions-item label="住所:">{{ enForm.officeAddress }}</el-descriptions-item>
        <el-descriptions-item label="法定代表人:">{{ enForm.legalPersonName }}</el-descriptions-item>
        <el-descriptions-item label="注册资本（万元）:">{{ enForm.registeredCapital }}</el-descriptions-item>
        <el-descriptions-item label="发证时间:">{{ enForm.timeInfo }}</el-descriptions-item>
        <el-descriptions-item label="有效期至:">{{ enForm.expiryDate }}</el-descriptions-item>

        <el-descriptions-item label="经营范围:" :span="3">{{ enForm.allowedBusiness }}</el-descriptions-item>
        <el-descriptions-item label="登记机关:" :span="3">{{ enForm.issuingUnit }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { getDetail } from '@/api/port-services/construction-dangerous-goods/construction-project'
import { constructionProject } from '@/utils/public-fields'
import { momentDate } from '@/utils/index'
export default {
  mixins: [constructionProject],
  data() {
    return {
      ruleForm: {},
      enForm: {},
      enterpriseList: [],
      tabIndex: 1,
      types: [
        { value: 1, label: '港口' },
        { value: 2, label: '航道' },
        { value: 3, label: '防波堤' },
        { value: 4, label: '码头' },
        { value: 5, label: '其他' }
      ]
    }
  },
  created() {
    const id = this.$route.query.id
    this.tabType = this.$route.query.type
    if (id) { // 新增
      this.fetchData(id)
    }
  },
  methods: {
    momentDate,
    getTypes(val){
      let name=''
      this.types.forEach(item=>{
        if (item.value===val){
          name = item.label
        }
      })
      return name
    },
    getNature(val){
      let name=''
      this.nature.forEach(item=>{
        if (item.value===val){
          name = item.label
        }
      })
      return name
    },
    getProjectLevel(val){
      let name=''
      this.projectLevel.forEach(item=>{
        if (item.value===val){
          name = item.label
        }
      })
      return name
    },
    getInvestmentSource(val){
      let name=''
      this.investmentSource.forEach(item=>{
        if (item.value===val){
          name = item.label
        }
      })
      return name
    },
    getDepartmentLevel(val){
      let name=''
      this.departmentLevel.forEach(item=>{
        if (item.value===val){
          name = item.label
        }
      })
      return name
    },
    getEnterpriseList(val){
      let name=''
      this.enterpriseList.forEach(item=>{
        if (item.enterpriseId===val){
          name = item.enterpriseName
        }
      })
      return name
    },
    // 查询详情
    async fetchData(id) {
      getDetail({ id }).then(res => {
        this.enForm = res.data && res.data.enterpriseBusinessInfoVo ? res.data.enterpriseBusinessInfoVo : {}
        this.ruleForm = res.data
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/build' })
    },
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

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
