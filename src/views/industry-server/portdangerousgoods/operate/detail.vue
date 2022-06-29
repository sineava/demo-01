<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口危险货物作业详情页" />
      </span>
      <span class="detail-header-button">
        <el-button :type="tabIndex===1?'primary':''" size="small" @click="tabIndex=1">港口危险货物作业情况反馈</el-button>
        <el-button :type="tabIndex===2?'primary':''" size="small" @click="tabIndex=2">港口危险货物作业申报信息</el-button>
        <el-button :type="tabIndex===3?'primary':''" size="small" @click="tabIndex=3">港口危险货物作业业务信息</el-button>
        <el-button :type="tabIndex===4?'primary':''" size="small" @click="tabIndex=4">港口危险货物作业审批信息</el-button>
      </span>
    </div>
    <div class="basic-detail7">
      <template v-if="tabIndex===1">
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="作业泊位:">{{ dangerousCargoOperationFeedbackInfoVo.operationBerth }}</el-descriptions-item>
          <el-descriptions-item label="船名/车牌:">{{ dangerousCargoOperationFeedbackInfoVo.boatName }}</el-descriptions-item>
          <el-descriptions-item label="货物名称:">{{ dangerousCargoOperationFeedbackInfoVo.cargoName }}</el-descriptions-item>
          <el-descriptions-item label="起运港:">{{ dangerousCargoOperationFeedbackInfoVo.shipmentPort }}</el-descriptions-item>
          <el-descriptions-item label="到达港:">{{ dangerousCargoOperationFeedbackInfoVo.arrivalPort }}</el-descriptions-item>
          <el-descriptions-item label="单位:">{{ dangerousCargoOperationFeedbackInfoVo.enterpriseName }}</el-descriptions-item>
          <el-descriptions-item label="计划吨:">{{ dangerousCargoOperationFeedbackInfoVo.operationNumber }}</el-descriptions-item>
          <el-descriptions-item label="操作过程:">{{ dangerousCargoOperationFeedbackInfoVo.operationProcess }}</el-descriptions-item>
          <el-descriptions-item label="作业吨:">{{ dangerousCargoOperationFeedbackInfoVo.operationActualNumber }}</el-descriptions-item>
          <el-descriptions-item label="下余吨位:">{{ dangerousCargoOperationFeedbackInfoVo.surplusNumber }}</el-descriptions-item>
          <el-descriptions-item label="操作工艺:">{{ dangerousCargoOperationFeedbackInfoVo.operationCraft }}</el-descriptions-item>
          <el-descriptions-item label="作业时间:">{{ dangerousCargoOperationFeedbackInfoVo.operationTime }}</el-descriptions-item>
          <el-descriptions-item label="人员:">{{ dangerousCargoOperationFeedbackInfoVo.staffName }}</el-descriptions-item>
        </el-descriptions>
        <Maptable
          ref="berthMap"
          :is-edit="false"
          :is-table="false"
          @change="confirmMap"
        />
      </template>
      <template v-if="tabIndex===2">
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="组织机构名称:">{{ ruleForm.orgName }}</el-descriptions-item>
          <el-descriptions-item label="组织机构现状:">{{ ruleForm.orgState }}</el-descriptions-item>
          <el-descriptions-item label="组织机构代码:">{{ ruleForm.orgCode }}</el-descriptions-item>
          <el-descriptions-item label="组织机构代码证发证日期:">{{ ruleForm.orgIssuingDate }}</el-descriptions-item>
          <el-descriptions-item label="组织机构代码证发证机构:">{{ ruleForm.orgIssuingUnit }}</el-descriptions-item>
          <el-descriptions-item label="组织机构代码证有效期起:">{{ ruleForm.startDate }}</el-descriptions-item>
          <el-descriptions-item label="组织机构代码证有效期止:">{{ ruleForm.endDate }}</el-descriptions-item>
          <el-descriptions-item label="组织机构类型:">{{ ruleForm.orgType }}</el-descriptions-item>
          <el-descriptions-item label="组织机构英文名称:">{{ ruleForm.orgEnName }}</el-descriptions-item>
          <el-descriptions-item label="企业类别代码:">{{ ruleForm.enterpriseCategoryCode }}</el-descriptions-item>
          <el-descriptions-item label="企业类别名称:">{{ ruleForm.enterpriseCategoryName }}</el-descriptions-item>

          <el-descriptions-item label="法定代表人:">{{ ruleForm.legalPersonName }}</el-descriptions-item>
          <el-descriptions-item label="法定代表人类型:">{{ ruleForm.legalPersonType }}</el-descriptions-item>
          <el-descriptions-item label="登记注册日期:">{{ ruleForm.registrationDate }}</el-descriptions-item>
          <el-descriptions-item label="单位注册地址:">{{ ruleForm.registrationAddress }}</el-descriptions-item>
          <el-descriptions-item label="经营（生产）范围（主营）:">{{ ruleForm.businessScope }}</el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-if="tabIndex===3">
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="港口危险货物作业单位:">{{ ruleForm.operationUnit }}</el-descriptions-item>
          <el-descriptions-item label="委托作业人:">{{ ruleForm.operationClient }}</el-descriptions-item>
          <el-descriptions-item label="船名/车牌号:">{{ ruleForm.boatName }}</el-descriptions-item>
          <el-descriptions-item label="船舶/车辆国籍:">{{ ruleForm.boatNationality }}</el-descriptions-item>
          <el-descriptions-item label="现场负责人:">{{ ruleForm.sitePersonName }}</el-descriptions-item>
          <el-descriptions-item label="现场负责人联系电话:">{{ ruleForm.sitePersonPhone }}</el-descriptions-item>
          <el-descriptions-item label="靠泊/作业时间:">{{ ruleForm.berthingTime }}</el-descriptions-item>
          <el-descriptions-item label="作业时间:">{{ ruleForm.operationTime }}</el-descriptions-item>
          <el-descriptions-item label="作业泊位/区域:">{{ ruleForm.operationBerth }}</el-descriptions-item>
          <el-descriptions-item label="作业方式:">{{ ruleForm.operationMode }}</el-descriptions-item>
          <el-descriptions-item label="危险货物名称:">{{ ruleForm.dangerCargoName }}</el-descriptions-item>

          <el-descriptions-item label="危险货物类别:">{{ ruleForm.dangerCargoCategory }}</el-descriptions-item>
          <el-descriptions-item label="危险货物危规/联合国UN编号:">{{ ruleForm.unCode }}</el-descriptions-item>
          <el-descriptions-item label="危险货物重量/箱量:">{{ ruleForm.dangerCargoNumber }}</el-descriptions-item>
          <el-descriptions-item label="装货港/地点1:">{{ ruleForm.firstLoadPort }}</el-descriptions-item>
          <el-descriptions-item label="卸货港/地点1:">{{ ruleForm.firstUnloadPort }}</el-descriptions-item>
          <el-descriptions-item label="装货港/地点2:">{{ ruleForm.secondLoadPort }}</el-descriptions-item>
          <el-descriptions-item label="卸货港/地点2:">{{ ruleForm.secondUnloadPort }}</el-descriptions-item>
          <el-descriptions-item label="货物经济性质:">{{ ruleForm.cargoEconomicNature }}</el-descriptions-item>
          <el-descriptions-item label="进出口标记:">{{ ruleForm.importExportMark }}</el-descriptions-item>
          <el-descriptions-item label="惰性化情况:">{{ ruleForm.situation }}</el-descriptions-item>

          <el-descriptions-item label="是否包装危险货物:">{{ ruleForm.isPacked }}</el-descriptions-item>
          <el-descriptions-item label="特殊要求说明:">{{ ruleForm.specialRequestDescription }}</el-descriptions-item>
          <el-descriptions-item label="作业安全防范措施:">{{ ruleForm.operationSafetyPrecaution }}</el-descriptions-item>
          <el-descriptions-item label="备注:">{{ ruleForm.remark }}</el-descriptions-item>
        </el-descriptions>
      </template>
      <template v-if="tabIndex === 4">
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item label="审批结果:">{{ dangerousCargoOperationApprovalVo && dangerousCargoOperationApprovalVo.approvalResult }}</el-descriptions-item>
          <el-descriptions-item label="审批时间:">{{ dangerousCargoOperationApprovalVo && dangerousCargoOperationApprovalVo.approvalTime }}</el-descriptions-item>
          <el-descriptions-item label="审批单位:">{{ dangerousCargoOperationApprovalVo && dangerousCargoOperationApprovalVo.approvalUnit }}</el-descriptions-item>
          <el-descriptions-item label="船舶/车辆国籍:">{{ ruleForm.boatNationality }}</el-descriptions-item>
          <el-descriptions-item label="审批人:">{{ dangerousCargoOperationApprovalVo && dangerousCargoOperationApprovalVo.approvedBy }}</el-descriptions-item>
        </el-descriptions>
      </template>
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
import { getDetail } from '@/api/port-services/danger-goods/dangerous-declare'
import Maptable from '@/components/Maptable/index'
export default {
  components: {
    Maptable
  },
  data() {
    return {
      ruleForm: {},
      dangerousCargoOperationApprovalVo: {},
      tabIndex: 1,
      geographyInfos:[],
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
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
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
        this.geographyInfos = res.data.berthCoordinatesVoList || []
        this.$nextTick(() => {
          this.$refs.berthMap.init(this.geographyInfos)
        })
        //
      })
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/portdangerousgoods/operate' })
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
