<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>建设项目信息详情</span>
    </div>
    <div class="icon-title">
      <span class="span" />建设项目建设单位基本情况信息
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
      <el-descriptions-item label="建设单位名称：">
        {{ enForm.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item label="统一社会信用代码：">
        {{ enForm.certificateNo }}
      </el-descriptions-item>
      <el-descriptions-item label="单位地址：">
        {{ enForm.officeAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="法定代表人：">
        {{ enForm.legalPersonName }}
      </el-descriptions-item>
      <el-descriptions-item label="联系人：">
        {{ enForm.contactName }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话：">
        {{ enForm.contactPhone }}
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱：">
        {{ enForm.email }}
      </el-descriptions-item>
    </el-descriptions>
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
      <el-descriptions-item label="邮政编码：">
        {{ enForm.postalCode }}
      </el-descriptions-item>
      <el-descriptions-item label="项目名称：">
        {{ enForm.projectName }}
      </el-descriptions-item>
      <el-descriptions-item label="建设类别：">
        {{ (types.find(x => x.value === ruleForm.type) || {}).label }}
      </el-descriptions-item>
      <el-descriptions-item label="建设性质：">
        {{ (nature.find(x => x.value === ruleForm.nature) || {}).label }}
      </el-descriptions-item>
      <el-descriptions-item label="所在港口名称：">
        {{ ruleForm.portName }}
      </el-descriptions-item>
      <el-descriptions-item label="工程地址：">
        {{ ruleForm.address }}
      </el-descriptions-item>
      <el-descriptions-item label="项目级别：">
        {{ (projectLevel.find(x => x.value === ruleForm.projectLevel) || {}).label }}
      </el-descriptions-item>
      <el-descriptions-item label="投资来源：">
        {{ (investmentSource.find(x => x.value === ruleForm.investmentSource) || {}).label }}
      </el-descriptions-item>
      <el-descriptions-item label="立项部门级别：">
        {{ (departmentLevel.find(x => x.value === ruleForm.departmentLevel) || {}).label }}
      </el-descriptions-item>
      <el-descriptions-item label="计划总投资(万元)：">
        {{ ruleForm.totalPlannedInvestment }}
      </el-descriptions-item>
      <el-descriptions-item label="计划总工期(月)：">
        {{ ruleForm.planTotalDate }}
      </el-descriptions-item>
      <el-descriptions-item label="计划开工年月：">
        {{ ruleForm.planStartDate }}
      </el-descriptions-item>
      <el-descriptions-item label="计划完工年月：">
        {{ ruleForm.planEndDate }}
      </el-descriptions-item>
      <el-descriptions-item label="实际开工年月：">
        {{ ruleForm.actualStartDate }}
      </el-descriptions-item>
      <el-descriptions-item label="实际完工年月：">
        {{ ruleForm.actualEndDate }}
      </el-descriptions-item>
      <el-descriptions-item label="装卸/储存主要危险货物品名：">
        {{ ruleForm.mainArticleName }}
      </el-descriptions-item>
      <el-descriptions-item label="建设项目概况：">
        {{ ruleForm.generalSituation }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="backstage-edit-btn">
      <el-button
        size="medium"
        @click="$router.back(-1)"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { getList } from '@/api/general-services/enterpriseInfo/external'
import { getDetail } from '@/api/port-services/construction-dangerous-goods/construction-project'
import { constructionProject } from '@/utils/public-fields'
export default {
  mixins: [constructionProject],
  data() {
    return {
      ruleForm: {},
      enForm: {},
      enterpriseList: [],
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
    // 查询企业列表
    this.fetchEnterprise('')
    const id = this.$route.query.id
    if (id) this.fetchData(id)
  },
  methods: {
    // 查询企业列表
    async fetchEnterprise(enterpriseName) {
      getList({ enterpriseName }).then(res => {
        this.enterpriseList = res.data ? res.data : []
      })
    },
    // 查询详情
    async fetchData(id) {
      getDetail({ id }).then(res => {
        this.$nextTick(() => {
          this.enForm = { ...res.data }
          this.ruleForm = { ...res.data }
        })
      })
    }
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
        width: 23.33%;
        line-height: 30px;
    }
}
</style>
