<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="危险货物作业反馈详情表" />
      </span>
      <span class="detail-header-button">
        <el-button :type="tabIndex===1?'primary':''" size="medium" @click="tabIndex=1">申报信息</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="medium" @click="tabIndex=2">业务信息</el-button>
        <el-button :type="tabIndex===3?'primary':''" size="medium" @click="tabIndex=3">审批信息</el-button>
        <el-button :type="tabIndex===4?'primary':''" size="medium" @click="tabIndex=4">反馈信息</el-button>
      </span>
    </div>
    <div class="basic-detail">
      <template v-if="tabIndex===1">
        <div class="icon-title">
          <span class="span" />港口危险货物作业申报信息
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
          <el-descriptions-item label="组织机构名称：">
            {{ ruleForm.orgName }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构现状：">
            {{ ruleForm.orgState }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构代码：">
            {{ ruleForm.orgCode }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构代码证发证日期：">
            {{ ruleForm.orgIssuingDate }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构代码证发证机构：">
            {{ ruleForm.orgIssuingUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构代码证有效期起：">
            {{ ruleForm.startDate }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构代码证有效期止：">
            {{ ruleForm.endDate }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构类型：">
            {{ ruleForm.orgType }}
          </el-descriptions-item>
          <el-descriptions-item label="组织机构英文名称：">
            {{ ruleForm.orgEnName }}
          </el-descriptions-item>
          <el-descriptions-item label="企业类别代码：">
            {{ ruleForm.enterpriseCategoryCode }}
          </el-descriptions-item>
          <el-descriptions-item label="企业类别名称：">
            {{ ruleForm.enterpriseCategoryName }}
          </el-descriptions-item>
          <el-descriptions-item label="法定代表人：">
            {{ ruleForm.legalPersonName }}
          </el-descriptions-item>
          <el-descriptions-item label="法定代表人类型：">
            {{ ruleForm.legalPersonType }}
          </el-descriptions-item>
          <el-descriptions-item label="登记注册日期：">
            {{ ruleForm.registrationDate }}
          </el-descriptions-item>
          <el-descriptions-item label="单位注册地址：">
            {{ ruleForm.registrationAddress }}
          </el-descriptions-item>
          <el-descriptions-item label="经营（生产）范围（主营）：">
            {{ ruleForm.businessScope }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-if="tabIndex===2">
        <div class="icon-title">
          <span class="span" />港口危险货物作业业务信息
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
          <el-descriptions-item label="港口危险货物作业单位：">
            {{ ruleForm.operationUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="委托作业人：">
            {{ ruleForm.operationClient }}
          </el-descriptions-item>
          <el-descriptions-item label="船名/车牌号：">
            {{ ruleForm.boatName }}
          </el-descriptions-item>
          <el-descriptions-item label="船舶/车辆国籍：">
            {{ ruleForm.boatNationality }}
          </el-descriptions-item>
          <el-descriptions-item label="现场负责人：">
            {{ ruleForm.sitePersonName }}
          </el-descriptions-item>
          <el-descriptions-item label="现场负责人联系电话：">
            {{ ruleForm.sitePersonPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="作业委托人联系人：">
            {{ ruleForm.operationClientContactName }}
          </el-descriptions-item>
          <el-descriptions-item label="作业委托人联系人电话：">
            {{ ruleForm.operationClientContactPhone }}
          </el-descriptions-item>
          <el-descriptions-item label="靠泊/作业时间：">
            {{ ruleForm.berthingTime }}
          </el-descriptions-item>
          <el-descriptions-item label="作业时间：">
            {{ ruleForm.operationTime }}
          </el-descriptions-item>
          <el-descriptions-item label="作业泊位/区域：">
            {{ ruleForm.operationBerth }}
          </el-descriptions-item>
          <el-descriptions-item label="作业方式：">
            {{ ruleForm.operationMode }}
          </el-descriptions-item>
          <el-descriptions-item label="危险货物名称：">
            {{ ruleForm.dangerCargoName }}
          </el-descriptions-item>
          <el-descriptions-item label="危险货物类别：">
            {{ ruleForm.dangerCargoCategory }}
          </el-descriptions-item>
          <el-descriptions-item label="危险货物危规/联合国UN编号：">
            {{ ruleForm.unCode }}
          </el-descriptions-item>
          <el-descriptions-item label="危险货物重量/箱量：">
            {{ ruleForm.dangerCargoNumber }}
          </el-descriptions-item>
          <el-descriptions-item label="装货港/地点1：">
            {{ ruleForm.firstLoadPort }}
          </el-descriptions-item>
          <el-descriptions-item label="卸货港/地点1：">
            {{ ruleForm.firstUnloadPort }}
          </el-descriptions-item>
          <el-descriptions-item label="装货港/地点2：">
            {{ ruleForm.secondLoadPort }}
          </el-descriptions-item>
          <el-descriptions-item label="卸货港/地点2：">
            {{ ruleForm.secondUnloadPort }}
          </el-descriptions-item>
          <el-descriptions-item label="货物经济性质：">
            {{ ruleForm.cargoEconomicNature }}
          </el-descriptions-item>
          <el-descriptions-item label="进出口标记：">
            {{ ruleForm.importExportMark }}
          </el-descriptions-item>
          <el-descriptions-item label="惰性化情况：">
            {{ ruleForm.situation }}
          </el-descriptions-item>
          <el-descriptions-item label="是否包装危险货物：">
            {{ ruleForm.isPacked }}
          </el-descriptions-item>
          <el-descriptions-item label="特殊要求说明：">
            {{ ruleForm.specialRequestDescription }}
          </el-descriptions-item>
          <el-descriptions-item label="作业安全防范措施：">
            {{ ruleForm.operationSafetyPrecaution }}
          </el-descriptions-item>
          <el-descriptions-item label="备注：">
            {{ ruleForm.remark }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-if="tabIndex===3">
        <div class="icon-title">
          <span class="span" />港口危险货物作业审批信息
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="审批结果：">
            {{ dangerousCargoOperationApprovalVo.approvalResult }}
          </el-descriptions-item>
          <el-descriptions-item label="审批时间：">
            {{ dangerousCargoOperationApprovalVo.approvalTime }}
          </el-descriptions-item>
          <el-descriptions-item label="审批单位：">
            {{ dangerousCargoOperationApprovalVo.approvalUnit }}
          </el-descriptions-item>
          <el-descriptions-item label="审批人：">
            {{ dangerousCargoOperationApprovalVo.approvedBy }}
          </el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-if="tabIndex===4">
        <div class="icon-title">
          <span class="span" />港口危险货物作业情况反馈
        </div>
        <el-form
          ref="dangerousCargoOperationFeedbackInfoVo"
          :model="dangerousCargoOperationFeedbackInfoVo"
          size="medium"
          class="table-column three"
          :rules="rules"
          label-width="200px"
        >
          <el-form-item
            label="作业泊位:"
            prop="berthId"
          >
            <el-select
              v-model="dangerousCargoOperationFeedbackInfoVo.berthId"
              placeholder="请选择作业泊位"
              :disabled="type === 'detail'"
              style="width: 100%;"
            >
              <el-option
                v-for="item in berthList"
                :key="item.id"
                :label="item.berthName"
                :value="item.id"
              />
            </el-select>
            <!-- <el-input v-model.trim="dangerousCargoOperationFeedbackInfoVo.operationBerth" :disabled="type === 'detail'" /> -->
          </el-form-item>
          <el-form-item
            label="船名/车牌:"
            prop="boatName"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.boatName"
              :disabled="type === 'detail'"
              placeholder="请输入船名/车牌"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item
            label="货物名称:"
            prop="cargoName"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.cargoName"
              :disabled="type === 'detail'"
              placeholder="请输入货物名称"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item
            label="起运港:"
            prop="shipmentPort"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.shipmentPort"
              :disabled="type === 'detail'"
              placeholder="请输入起运港"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item
            label="到达港:"
            prop="arrivalPort"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.arrivalPort"
              :disabled="type === 'detail'"
              placeholder="请输入到达港"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item
            label="单位:"
            prop="enterpriseName"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.enterpriseName"
              :disabled="type === 'detail'"
              placeholder="请输入单位"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="计划吨:"
            prop="operationNumber"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.operationNumber"
              :disabled="type === 'detail'"
              placeholder="请输入计划吨"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="操作过程:"
            prop="operationProcess"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.operationProcess"
              :disabled="type === 'detail'"
              placeholder="请输入操作过程"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="作业吨:"
            prop="operationActualNumber"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.operationActualNumber"
              :disabled="type === 'detail'"
              placeholder="请输入作业吨"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="剩余吨位:"
            prop="surplusNumber"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.surplusNumber"
              :disabled="type === 'detail'"
              placeholder="请输入剩余吨位"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="操作工艺:"
            prop="operationCraft"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.operationCraft"
              :disabled="type === 'detail'"
              placeholder="请输入操作工艺"
              maxlength="32"
            />
          </el-form-item>
          <el-form-item
            label="作业时间:"
            prop="operationTime"
          >
            <el-date-picker
              v-model="dangerousCargoOperationFeedbackInfoVo.operationTime"
              type="datetime"
              :disabled="type === 'detail'"
              placeholder="请选择作业时间"
            />
          </el-form-item>
          <el-form-item
            label="人员:"
            prop="staffName"
          >
            <el-input
              v-model="dangerousCargoOperationFeedbackInfoVo.staffName"
              :disabled="type === 'detail'"
              placeholder="请输入人员"
              maxlength="500"
            />
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail' && tabIndex=== 4"
        type="primary"
        size="medium"
        :loading="loading"
        @click="submitForm('dangerousCargoOperationFeedbackInfoVo')"
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
  </el-card>
</template>

<script>
import { getDetail, addFeedback, getBerthList } from '@/api/port-services/danger-goods/dangerous-declare'
import moment from 'moment'
export default {
  data() {
    return {
      ruleForm: {},
      dangerousCargoOperationApprovalVo: {},
      dangerousCargoOperationFeedbackInfoVo: {
        operationBerth: '',
        boatName: '',
        cargoName: '',
        shipmentPort: '',
        arrivalPort: '',
        enterpriseName: '',
        operationNumber: '',
        operationProcess: '',
        operationActualNumber: '',
        surplusNumber: '',
        operationCraft: '',
        operationTime: '',
        staffName: '',
        berthId: null,
        declareInfoId: null
      },
      tabIndex: 1,
      berthList: [],
      loading: false,
      rules: {
        berthId: [
          { required: true, message: '请选择泊位', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const { id, type } = this.$route.query
    this.type = type
    this.dangerousCargoOperationFeedbackInfoVo.declareInfoId = id
    if (id) {
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      const res = await getDetail({ id })
      this.ruleForm = {
        ...res.data
      }
      this.dangerousCargoOperationApprovalVo = res.data.dangerousCargoOperationApprovalVo
      if (res.data.dangerousCargoOperationFeedbackInfoVo) {
        this.dangerousCargoOperationFeedbackInfoVo = res.data.dangerousCargoOperationFeedbackInfoVo
      }
      const berthList = await getBerthList({ enterpriseId: res.data.enterpriseId })
      this.berthList = berthList.data
      this.berthList.forEach(item => {
        item.id = String(item.id)
      })
      this.dangerousCargoOperationFeedbackInfoVo.berthId = String(this.dangerousCargoOperationFeedbackInfoVo.berthId)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    // 保存数据
    saveData() {
      delete this.dangerousCargoOperationFeedbackInfoVo.id
      this.dangerousCargoOperationFeedbackInfoVo.declareInfoId = this.ruleForm.id
      this.loading = true
      this.dangerousCargoOperationFeedbackInfoVo.operationTime = this.dangerousCargoOperationFeedbackInfoVo.operationTime ? moment(this.dangerousCargoOperationFeedbackInfoVo.operationTime).format('YYYY-MM-DD HH:mm:ss') : ''
      addFeedback(this.dangerousCargoOperationFeedbackInfoVo).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/portdangerousgoods/work' })
    }
  }
}
</script>

<style lang="scss" scoped>
.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 13%;
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

.basic-detail {
    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
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
