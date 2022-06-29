<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="专项验收信息审核" />
      </span>
      <span class="tab-wrap">
        <el-button :type="tabIndex===1?'primary':''" size="medium" @click="tabIndex=1">基本信息</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="medium" @click="tabIndex=2">组织机构</el-button>
        <el-button :type="tabIndex===3?'primary':''" size="medium" @click="tabIndex=3">材料列表</el-button>
      </span>
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
        <el-descriptions-item label="港航机构名称:" :span="2">{{ ruleForm.departmentName }}</el-descriptions-item>
        <el-descriptions-item label="项目名称:">{{ ruleForm.applyProjectName }}</el-descriptions-item>
        <el-descriptions-item label="联系人:">{{ ruleForm.applyContact }}</el-descriptions-item>
        <el-descriptions-item label="负责人:">{{ ruleForm.applyPrincipal }}</el-descriptions-item>
        <el-descriptions-item label="联系电话:">{{ ruleForm.applyPhone }}</el-descriptions-item>
        <el-descriptions-item label="工程开始结束时间:">{{ screenTime[0] +" - "+ screenTime[1] }}</el-descriptions-item>
        <el-descriptions-item label="单位地址:">{{ ruleForm.applyAddress }}</el-descriptions-item>
        <el-descriptions-item label="邮编:">{{ ruleForm.applyPostcode }}</el-descriptions-item>
        <el-descriptions-item label="港口建设项目概况:" :span="3">{{ ruleForm.generalize }}</el-descriptions-item>
        <el-descriptions-item label="装卸/储存主要危险货物品名:" :span="3">{{ ruleForm.goodsName }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <div v-show="tabIndex===3" class="basic-detail">
      <div class="icon-title">
        <span class="span" />材料信息
      </div>
      <el-form>
        <el-form-item
          label="安全条件审查意见书附件:"
          prop="filePathB"
          label-width="200"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathB"
            :show-download="true"
          />
        </el-form-item>
        <el-form-item
          label="安全设施设计审查意见书附件:"
          prop="filePathA"
          label-width="200"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.filePathA"
            :show-download="true"
          />
        </el-form-item>
      </el-form>
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
import commonTable from '@/components/features/FileTable'
import { getDetail, handleInfo } from '@/api/port-services/construction-dangerous-goods/safety-facility-acceptance'
export default {
  components: {
    commonTable
  },
  data() {
    return {
      type: '',
      tabIndex:1,
      screenTime: [],
      ruleForm: {},
      enForm:{},
      rules: {
        isPass: [
          { required: true, message: '请选择业务办理', trigger: 'blur' }
        ]
      },
      acceptanceState: [
        { value: 1, label: '已受理' },
        { value: 2, label: '审核中' },
        { value: 3, label: '审核通过' },
        { value: 4, label: '退回' }
      ],
      isPass: [
        { value: 3, label: '通过' },
        { value: 4, label: '退回' }
      ]
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      getDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            filePathA: res.data.filePathA ? JSON.parse(res.data.filePathA) : [],
            filePathB: res.data.filePathB ? JSON.parse(res.data.filePathB) : []
          }
          this.screenTime = [res.data.projectStartTime, res.data.projectEndTime]
          this.enForm = res.data && res.data.enterpriseBusinessInfoVo ? res.data.enterpriseBusinessInfoVo : {}
        }
      })
    },
    getIsPass(val){
      let name=''
      this.isPass.forEach(item=>{
        if (item.value===val){
          name=item.label
        }
      })
      return name
    },
    // 保存数据
    async saveData() {
      const safetyFacilityDesignReviewInfoDto = {
        id: this.ruleForm.id,
        isPass: this.ruleForm.isPass,
        auditOpinion: this.ruleForm.auditOpinion
      }
      handleInfo(safetyFacilityDesignReviewInfoDto).then(res => {
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/checkaccept' })
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
        width: 20%;
        line-height: 30px;
    }
}

/deep/ .clearfix {
    display: flex;
    align-items: center;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>
