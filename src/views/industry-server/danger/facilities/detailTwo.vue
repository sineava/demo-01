<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>安全设施设计审查受理</span>
      <div class="tab-wrap">
        <el-button :type="tabIndex===1?'primary':''" size="medium" @click="tabIndex=1">基本信息</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="medium" @click="tabIndex=2">组织机构</el-button>
        <el-button :type="tabIndex===3?'primary':''" size="medium" @click="tabIndex=3">材料列表</el-button>
      </div>
    </div>
    <div class="basic-detail">
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
          <span class="span" />基本信息
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
          <el-descriptions-item label="申请单位名称:">{{ ruleForm.enterpriseName }}</el-descriptions-item>
          <el-descriptions-item label="项目名称:">{{ ruleForm.projectName }}</el-descriptions-item>
          <el-descriptions-item label="联系人:">{{ ruleForm.declareContact }}</el-descriptions-item>
          <el-descriptions-item label="负责人:">{{ ruleForm.declarePrincipal }}</el-descriptions-item>
          <el-descriptions-item label="联系电话:">{{ ruleForm.declarePhone }}</el-descriptions-item>
          <el-descriptions-item label="审查申请时间:">{{ ruleForm.applyTime }}</el-descriptions-item>
          <el-descriptions-item label="申请原因:">{{ ruleForm.applyReason }}</el-descriptions-item>
        </el-descriptions>
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" />审核意见
        </div>
        <el-descriptions
          class="descriptions-one"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title-span"
          contentClassName="business-text-span"
          border
        >
          <el-descriptions-item label="受理状态:" :span="3">
            <el-tag
              v-if="ruleForm.reviewState === 1"
            >
              已受理
            </el-tag>
            <el-tag
              v-if="ruleForm.reviewState === 2"
              type="warning"
            >
              审核中
            </el-tag>
            <el-tag
              v-if="ruleForm.reviewState === 3"
              type="success"
            >
              审核通过
            </el-tag>
            <el-tag
              v-if="ruleForm.reviewState === 4"
              type="danger"
            >
              退回
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="受理意见:" :span="3">{{ ruleForm.acceptOpinion }}</el-descriptions-item>
          <el-descriptions-item v-if="type === 'detail'&&ruleForm.reviewState>2" label="审核意见:" :span="3">{{ ruleForm.auditOpinion }}</el-descriptions-item>
        </el-descriptions>
        <div v-if="type === 'handle'" class="icon-title" style="margin-top: 20px;">
          <span class="span" />业务审核
        </div>
         <el-form
          v-if="type === 'handle'"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="140px"
          size="medium"
          class="table-column"
        >
          <el-form-item
            label="业务办理"
            style="width: 100%;"
            prop="isPass"
          >
            <el-select
              v-model="ruleForm.isPass"
              clearable
              style="width: 100%;"
              placeholder="请选择业务办理"
            >
              <el-option label="审核通过" :value="3" />
              <el-option label="退回" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="审核意见"
            style="width: 100%;"
            prop="auditOpinion"
          >
            <el-input
              v-model.trim="ruleForm.auditOpinion"
              type="textarea"
              rows="6"
              maxlength="200"
              show-word-limit
              placeholder="请输入审核意见"
            />
          </el-form-item>
        </el-form>
      </div>
      <div v-show="tabIndex===3" class="basic-detail">
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" />建设项目安全设施设计专篇文件附件
        </div>
        <commonTable
          :table-data="ruleForm.filePathE"
          payload="file1"
          :show-download="true"
        />
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" />选址意见书附件
        </div>
        <commonTable
          :table-data="ruleForm.filePathC"
          payload="file2"
          :show-download="true"
        />
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" />当地公安机关消防机构的消防设计审查文件附件
        </div>
        <commonTable
          :table-data="ruleForm.filePathD"
          payload="file3"
          :show-download="true"
        />
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" />安全设施设计审查意见书附件
        </div>
        <commonTable
          :table-data="ruleForm.filePathA"
          payload="file4"
          :show-download="true"
        />
      </div>
      <div class="backstage-edit-btn">
        <el-button
          v-if="type === 'handle'"
          type="primary"
          size="medium"
          :loading="loading"
          @click="saveData"
        >
          保存
        </el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import commonTable from '@/components/features/FileTable'
import { queryDetail, handleReview } from '@/api/port-services/construction-dangerous-goods/port-safety-facility-design-review'
import { portSafetyFacilityDesignReview } from '@/utils/public-fields'
export default {
  components: {
    commonTable
  },
  mixins: [portSafetyFacilityDesignReview],
  data() {
    return {
      type: '',
      tabIndex: 1,
      ruleForm: {},
      enForm:{},
      loading: false,
      rules: {
        isPass: [
          { required: true, message: '请选择业务办理', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.fetchData(id)
  },
  methods: {
    async fetchData(id) {
      queryDetail({ id }).then(res => {
        if (res.data) {
          this.ruleForm = {
            ...res.data,
            filePathA: res.data.filePathA ? JSON.parse(res.data.filePathA) : [],
            filePathB: res.data.filePathB ? JSON.parse(res.data.filePathB) : [],
            filePathC: res.data.filePathC ? JSON.parse(res.data.filePathC) : [],
            filePathD: res.data.filePathD ? JSON.parse(res.data.filePathD) : [],
            filePathE: res.data.filePathE ? JSON.parse(res.data.filePathE) : []
          }
          this.enForm = res.data && res.data.enterpriseBusinessInfoVo ? res.data.enterpriseBusinessInfoVo : {}
        }
      })
    },
    // 保存数据
    async saveData() {
      const safetyFacilityDesignReviewInfoDto = {
        id: this.ruleForm.id,
        isPass: this.ruleForm.isPass,
        auditOpinion: this.ruleForm.auditOpinion
      }
      this.loading = true
      handleReview(safetyFacilityDesignReviewInfoDto).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/danger/facilities' })
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

.descriptions-one {
    margin-bottom: 20px;

    /deep/ .business-text {
        width: 20%;
        line-height: 30px;
    }

    /deep/ .business-title-span {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text-span {
        width: 90%;
        line-height: 30px;
    }
}

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>
