<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业基础信息变更" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="info.isStatus === 2 && isDisabled"
          type="primary"
          @click="isDisabled=false"
        >
          重新提交
        </el-button>
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 船舶管理企业基本信息
    </div>
    <div class="basic_title">
      {{ enterpriseInfo.enterpriseName }}
    </div>
    <el-table
      :data="tableList"
      fit
      border
      class="table-border"
    >
      <el-table-column
        label="变更前"
        prop="label1"
      />
      <el-table-column label="">
        <template v-slot="scope">
          {{ waterTransportInfo[scope.row.name1] }}
        </template>
      </el-table-column>
      <el-table-column
        label="变更后"
        prop="label2"
      />
      <el-table-column label="">
        <template v-slot="scope">
          <el-input
            v-if="!isDisabled"
            v-model="basicChangeInfo[scope.row.name2]"
            placeholder="请输入内容"
          />
          <span v-else>{{ basicChangeInfo[scope.row.name2] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="icon-title">
      <span class="span" /> 水路运输企业投资人信息
    </div>
    <div class="table-title">
      变更前
    </div>
    <el-table
      :data="beforeChangeInfoDtoList"
      fit
      border
      class="table-border"
    >
      <el-table-column label="序号">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="个人/企业"
        prop="investorName"
      />
      <el-table-column
        label="投资单位名称"
        prop="investorUnit"
      />
      <el-table-column
        label="金额"
        prop="investorAmount"
      >
        <template v-slot="scope">
          {{ scope.row.investorAmount }}万元
        </template>
      </el-table-column>
      <el-table-column
        label="投资比例"
        prop="investorScale"
      >
        <template v-slot="scope">
          {{ scope.row.investorScale }}%
        </template>
      </el-table-column>
      <el-table-column
        label="证件号"
        prop="credentialNo"
      />
      <el-table-column
        label="备注"
        prop="remark"
      />
    </el-table>
    <div class="table-title">
      变更后
    </div>
    <el-table
      :data="afterTableList"
      fit
      border
      class="table-border"
      style="margin: 0;"
    >
      <el-table-column label="序号">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="个人/企业"
        prop="investorName"
      />
      <el-table-column
        label="投资单位名称"
        prop="investorUnit"
      />
      <el-table-column
        label="金额"
        prop="investorAmount"
      >
        <template v-slot="scope">
          {{ scope.row.investorAmount }}万元
        </template>
      </el-table-column>
      <el-table-column
        label="投资比例"
        prop="investorScale"
      >
        <template v-slot="scope">
          {{ scope.row.investorScale }}%
        </template>
      </el-table-column>
      <el-table-column
        label="证件号"
        prop="credentialNo"
      />
      <el-table-column
        label="备注"
        prop="remark"
      />
      <el-table-column
        v-if="!isDisabled"
        label="操作"
        width="200"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="editDialog(scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="deleteList(scope.row)"
          >
            <em class="el-icon-edit" /> 移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="!isDisabled"
      class="table-add"
      @click="addDialog"
    >
      <i class="el-icon-plus" />添加变更人员
    </div>
    <div
      v-if="info.isStatus >= 2"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
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
        <el-descriptions-item label="审核状态">{{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}</el-descriptions-item>
        <el-descriptions-item label="审核人">{{ info.reviewedBy }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ info.reviewedDate }}</el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="3">
          {{ info.reviewedOpinion }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />审核附件
      </div>
      <common-table
        :table-data="info.reviewedFile"
        show-download
      />
    </div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="!isDisabled"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm"
      >
        提交
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="投资人信息"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="800px"
    >
      <add-dialog
        v-if="dialogVisible"
        ref="add"
        :table-list="afterChangeInfoDtoList"
        :table-index="activeDialogIndex"
        @submit="dialogSubmit"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/sm-en-base-filing'
import { getEnShipManageInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { shipInvestorsList } from '@/api/water-transportation-services/information/investors'
import CommonTable from '@/components/features/FileTable.vue'
import AddDialog from './addDialog.vue'
import { firstUpperCase } from '@/utils/index'
export default {
  components: {
    AddDialog,
    CommonTable
  },
  data() {
    return {
      enterpriseInfo: {},
      tableList: [
        { label1: '企业中文名称：', name1: 'enterpriseName', label2: '企业中文名称：', name2: 'changeEnterpriseName' },
        { label1: '行政区划：', name1: 'administrativeDivision', label2: '行政区划：', name2: 'changeAdministrativeDivision' },
        { label1: '注册地址：', name1: 'officeAddress', label2: '注册地址：', name2: 'changeOfficeAddress' },
        { label1: '法定代表人：', name1: 'legalPersonName', label2: '法定代表人：', name2: 'changeLegalPersonName' },
        { label1: '法人身份证号码：', name1: 'legalPersonCardNo', label2: '法人身份证号码：', name2: 'changeLegalPersonCardNo' },
        { label1: '联系人姓名：', name1: 'contactName', label2: '联系人姓名：', name2: 'changeContactName' },
        { label1: '联系电话：', name1: 'contactPhone', label2: '联系电话：', name2: 'changeContactPhone' },
        { label1: '传真', name1: 'faxNumber', label2: '传真', name2: 'changeFaxNumber' },
        { label1: '资金币种：', name1: 'currencyCategory', label2: '资金币种：', name2: 'changeCurrencyCategory' },
        { label1: '注册资本（万元）：', name1: 'registeredCapital', label2: '注册资本（万元）：', name2: 'changeRegisteredCapital' },
        { label1: '经营范围：', name1: 'allowedBusiness', label2: '经营范围：', name2: 'changeAllowedBusiness' },
        { label1: '国内符合证明编号：', name1: 'certificateCode', label2: '国内符合证明编号：', name2: 'changeCertificateCode' },
        { label1: '国内符合证明发证单位：', name1: 'certificateUnit', label2: '国内符合证明发证单位：', name2: 'changeCertificateUnit' },
        { label1: '备注：', name1: 'remark', label2: '备注：', name2: 'changeRemark' }
      ], // 基础数据
      waterTransportInfo: {}, // 基础信息变更前数据
      basicChangeInfo: {}, // 基础信息变更后数据
      beforeChangeInfoDtoList: [], // 投资人变更前数据
      afterChangeInfoDtoList: [], // 投资人变更后数据
      loading: false,
      info: {},
      isDisabled: false,
      dialogVisible: false,
      activeDialogIndex: -1
    }
  },
  // 展示未删除的数据
  computed: {
    afterTableList: function() {
      return this.afterChangeInfoDtoList.filter(item => item.isStatus !== 3)
    }
  },
  async mounted() {
    this.enterpriseInfo = this.$store.getters.enterprise
    // 查询页面详情
    if (this.$route.query.id) { // 详情数据展示
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      this.isDisabled = true
      // 组装展示数据
      const basicData = JSON.parse(JSON.stringify(info.data))
      // 投资人信息
      this.beforeChangeInfoDtoList = basicData.beforeChangeInfoVoList
      this.afterChangeInfoDtoList = basicData.afterChangeInfoVoList
      // 删除多余数据
      delete basicData.beforeChangeInfoVoList
      delete basicData.afterChangeInfoVoList
      delete basicData.reviewedBy
      delete basicData.reviewedDate
      delete basicData.reviewedFile
      delete basicData.reviewedOpinion
      delete basicData.isStatus
      // 组装基础数据(去掉变更后的数据)
      const waterTransportInfo = {}
      const basicChangeInfo = {}
      for (let infoKey in basicData) {
        if (infoKey.substring(0, 6) === 'change') {
          basicChangeInfo[infoKey] = basicData[infoKey]
        } else {
          waterTransportInfo[infoKey] = basicData[infoKey]
        }
      }
      this.waterTransportInfo = { ...waterTransportInfo }
      this.basicChangeInfo = { ...basicChangeInfo }
    } else { // 获取变更前数据
      // 查询变更前企业详情
      const basicInfo = (await getEnShipManageInfo()).data
      // 查询变更前投资人信息
      const infoData = (await shipInvestorsList()).data
      /*
       * 企业基础信息组装
       * 删除多余信息
       */
      basicInfo.enterpriseId = basicInfo.id
      basicInfo.allowedBusiness = basicInfo.enterpriseBusinessInfoVo?.allowedBusiness
      basicInfo.registeredCapital = basicInfo.enterpriseBusinessInfoVo?.registeredCapital
      delete basicInfo.enterpriseBusinessInfoVo
      delete basicInfo.id
      delete basicInfo.organizationId
      delete basicInfo.organizationName
      delete basicInfo.updateTime
      delete basicInfo.enterpriseCategory
      delete basicInfo.economicType
      // 设置数据
      this.waterTransportInfo = { ...basicInfo }
      // 拼装变更后的数据change+首字母大写
      for (let key in basicInfo) {
        if (basicInfo.hasOwnProperty(key)) {
          basicInfo[`change${firstUpperCase(key)}`] = basicInfo[key]
          delete basicInfo[key]
        }
      }
      this.basicChangeInfo = { ...basicInfo }
      delete this.basicChangeInfo.changeEnterpriseId
      /*
       * 投资人信息组装
       * 删除多余信息
       */
      infoData.forEach(infoItem => {
        infoItem.investorsId = infoItem.id
        delete infoItem.id
        delete infoItem.enterpriseId
        delete infoItem.enterpriseName
      })
      this.beforeChangeInfoDtoList = JSON.parse(JSON.stringify(infoData))
      this.afterChangeInfoDtoList = [...infoData]
      /*
       * 添加一个默认状态进变更后的数据里面
       * isStatus(0默认1修改2新增3移除)
       */
      this.afterChangeInfoDtoList.forEach(item => {
        item.isStatus = 0
      })
    }
  },
  methods: {
    addSubmit() {
      this.$refs.add.submitForm()
    },
    // 列表添加
    addDialog() {
      this.dialogVisible = true
      this.activeDialogIndex = -1
    },
    // 列表编辑
    editDialog(obj) {
      let activeIndex = -1
      this.afterChangeInfoDtoList.forEach((item, index) => {
        if (obj.investorName === item.investorName) {
          activeIndex = index
        }
      })
      this.dialogVisible = true
      this.activeDialogIndex = activeIndex
    },
    // 列表移除
    deleteList(obj) {
      let activeIndex = -1
      this.afterChangeInfoDtoList.forEach((item, index) => {
        if (obj.investorName === item.investorName) {
          activeIndex = index
        }
      })
      if (activeIndex >= 0) {
        const obj = this.afterChangeInfoDtoList[activeIndex]
        obj.isStatus = 3
        this.$set(this.afterChangeInfoDtoList, activeIndex, obj)
      }
    },
    // 添加完成数据
    dialogSubmit(obj) {
      obj.isStatus = this.activeDialogIndex >= 0 ? 1 : 2
      if (this.activeDialogIndex >= 0) {
        obj.investorsId = this.afterChangeInfoDtoList[this.activeDialogIndex].investorsId
        this.afterChangeInfoDtoList.splice(this.activeDialogIndex, 1, obj)
      } else {
        this.afterChangeInfoDtoList.push(obj)
      }
      this.dialogVisible = false
    },
    /**
     * 保存
     */
    async submitForm() {
      let data = { ...this.basicChangeInfo, ...this.waterTransportInfo }
      data.id = this.$route.query.id || ''
      data.afterChangeInfoDtoList = this.afterChangeInfoDtoList
      data.beforeChangeInfoDtoList = this.beforeChangeInfoDtoList
      data.isChange = 0
      data.organizationName = this.enterpriseInfo.organizationName
      data.organizationId = this.enterpriseInfo.organizationId
      this.loading = true
      let res = this.$route.query.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}

.basic_title {
    display: inline-flex;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 0 20px;
    height: 35px;
    font-size: 14px;
    font-weight: 700;
    line-height: 35px;
    color: #ffffff;
    background-color: rgba(64, 158, 255, 1);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.35);
}

/deep/ .table-border {
    margin-bottom: 20px;

    th {
        height: 40px;
        color: #ffffff;
        background-color: #409eff;
    }
}

.table-title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #409eff;
}

.table-add {
    border: 1px solid #ebeef5;
    border-top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #666666;
    cursor: pointer;
}

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
