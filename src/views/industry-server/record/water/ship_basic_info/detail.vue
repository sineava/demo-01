<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="水路运输企业基础信息变更" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 水路运输企业基本信息
    </div>
    <div class="basic_title">
      {{ info.enterpriseName }}
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
          {{ basicChangeInfo[scope.row.name2] }}
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
    <div v-if="isEdit">
      <div class="icon-title">
        <span class="span" /> 备案审核
      </div>
      <el-form
        ref="ruleForm"
        size="medium"
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        class="table-top-column-there"
      >
        <el-form-item
          label="备案审核:"
          prop="isStatus"
        >
          <el-radio-group v-model="ruleForm.isStatus">
            <el-radio :label="3">
              业务办理
            </el-radio>
            <el-radio :label="2">
              退回
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="审核意见:"
          style="width: 100%;"
          prop="reviewedOpinion"
        >
          <el-input
            v-model.trim="ruleForm.reviewedOpinion"
            type="textarea"
            :rows="6"
            placeholder="请输入审核意见"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <upload
          style="width: 100%;"
          file
          :show-file-list="false"
          :limit="9"
          multiple
          @fileSuccess="uploadSuccess"
        />
        <common-table
          :table-data="reviewedFile"
          show-download
          show-delete
          @handleDelete="handleDelete"
        />
      </el-form>
    </div>
    <div v-if="info.isStatus >= 2">
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
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="submitForm('ruleForm')"
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
  </el-card>
</template>

<script>
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/sm-en-base-filing'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
export default {
  components: {
    upload,
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
      ruleForm: {
        id: '',
        isStatus: '',
        reviewedBy: '',
        reviewedOpinion: ''
      },
      rules: {
        isStatus: [
          { required: true, message: '请选择备案审核', trigger: 'change' }
        ]
      },
      reviewedFile: [],
      isEdit: false,
      loading: false,
      info: {}
    }
  },
  // 展示未删除的数据
  computed: {
    afterTableList: function() {
      return this.afterChangeInfoDtoList.filter(item => item.isStatus !== 3)
    }
  },
  async mounted() {
    // 查询页面详情
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      /*
       * 组装展示数据
       * 投资人信息
       */
      this.beforeChangeInfoDtoList = info.data.beforeChangeInfoVoList
      this.afterChangeInfoDtoList = info.data.afterChangeInfoVoList
      // 组装基础数据(去掉变更后的数据)
      const waterTransportInfo = {}
      const basicChangeInfo = {}
      for (let infoKey in info.data) {
        if (infoKey.substring(0, 6) === 'change') {
          basicChangeInfo[infoKey] = info.data[infoKey]
        } else {
          waterTransportInfo[infoKey] = info.data[infoKey]
        }
      }
      this.waterTransportInfo = { ...waterTransportInfo }
      this.basicChangeInfo = { ...basicChangeInfo }
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      let data = { ...this.ruleForm }
      data.reviewedFile = JSON.stringify(this.reviewedFile)
      this.loading = true
      reviewData(data).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
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

    .is-disabled {
        .el-input__inner, .el-textarea__inner {
            background-color: #ffffff;
        }
    }
}

.table-title {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
    color: #409eff;
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
</style>
