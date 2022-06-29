<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>港口危险货物作业详情页</span>
    </div>
    <div class="basic-detail7">
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
      <div class="icon-title">
        <span class="span" />港口危险货物作业情况反馈
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
        <el-descriptions-item label="作业泊位：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationBerth }}
        </el-descriptions-item>
        <el-descriptions-item label="船名/车牌：">
          {{ dangerousCargoOperationFeedbackInfoVo.boatName }}
        </el-descriptions-item>
        <el-descriptions-item label="货物名称：">
          {{ dangerousCargoOperationFeedbackInfoVo.cargoName }}
        </el-descriptions-item>
        <el-descriptions-item label="起运港：">
          {{ dangerousCargoOperationFeedbackInfoVo.shipmentPort }}
        </el-descriptions-item>
        <el-descriptions-item label="到达港：">
          {{ dangerousCargoOperationFeedbackInfoVo.arrivalPort }}
        </el-descriptions-item>
        <el-descriptions-item label="单位：">
          {{ dangerousCargoOperationFeedbackInfoVo.enterpriseName }}
        </el-descriptions-item>
        <el-descriptions-item label="计划吨：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="操作过程：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationProcess }}
        </el-descriptions-item>
        <el-descriptions-item label="作业吨：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationActualNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="下余吨位：">
          {{ dangerousCargoOperationFeedbackInfoVo.surplusNumber }}
        </el-descriptions-item>
        <el-descriptions-item label="操作工艺：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationCraft }}
        </el-descriptions-item>
        <el-descriptions-item label="作业时间：">
          {{ dangerousCargoOperationFeedbackInfoVo.operationTime }}
        </el-descriptions-item>
        <el-descriptions-item label="人员：">
          {{ dangerousCargoOperationFeedbackInfoVo.staffName }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
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
import { getDetail } from '@/api/port-services/danger-goods/dangerous-declare'
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
        staffName: ''
      }
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.fetchDetail(id)
    }
  },
  methods: {
    // 查询详情
    async fetchDetail(id) {
      getDetail({ id }).then(res => {
        this.ruleForm = {
          ...res.data
        }
        this.dangerousCargoOperationApprovalVo = res.data.dangerousCargoOperationApprovalVo
        if (res.data.dangerousCargoOperationFeedbackInfoVo) {
          this.dangerousCargoOperationFeedbackInfoVo = res.data.dangerousCargoOperationFeedbackInfoVo
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-detail7 {
    .map {
        margin: 10px 0;
        border: 1px solid #ebeef5;
        width: 90%;
        height: 550px;
    }

    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        border: 1px solid #ebeef5;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 33.3%;
            background-color: #ffffff;

            /deep/ .el-input--medium .el-input__inner {
                border: none;
            }

            /deep/ .el-input-number {
                width: 100%;
            }
        }
    }
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 15%;
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
