<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="代理企业开业备案详情页" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <div class="list-column-wrap">
      <div class="info-list info-list-two">
        <div class="label">
          企业名称:
        </div><div class="content">
          {{ info.enterpriseName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          营业执照编号:
        </div><div class="content">
          {{ info.businessLicenseNo }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          行政区划:
        </div><div class="content">
          {{ info.administrativeDivision }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          企业类型:
        </div><div class="content">
          {{ info.enterpriseType ? shipTypeList[info.enterpriseType - 1].val : '' }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          固定办公场所:
        </div><div class="content">
          {{ info.officeAddress }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          法定代表人名称:
        </div><div class="content">
          {{ info.legalPersonName }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          电话号码:
        </div><div class="content">
          {{ info.contactPhone }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          法人身份证号:
        </div><div class="content">
          {{ info.legalPersonCardNo }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          传真:
        </div><div class="content">
          {{ info.faxNumber }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          经济类型:
        </div><div class="content">
          {{ info.economicType }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          注册资本:
        </div><div class="content">
          {{ info.registeredCapital }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          企业注册地址:
        </div><div class="content">
          {{ info.fixedOfficeSpace }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          电子邮箱:
        </div><div class="content">
          {{ info.email }}
        </div>
      </div>
      <div class="info-list info-list-two">
        <div class="label">
          联系人:
        </div><div class="content">
          {{ info.contactName }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div style="flex: 0.815;" class="label">
          经营范围:
        </div><div class="content">
          {{ info.allowedBusiness }}
        </div>
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /> 备案申请信息
    </div>
    <div class="list-column-wrap">
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label" style="flex: 0.815;">
          申请业务种类:
        </div><div class="content">
          {{ info.appliedBusinessType === 1?'水路旅客运输代理':(info.appliedBusinessType === 2?'水路货物运输代理':'船舶代理') }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label" style="flex: 0.815;">
          申请理由:
        </div><div class="content">
          {{ info.appliedReasons }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label" style="flex: 0.815;">
          联系人:
        </div><div class="content">
          {{ info.contactPerson }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label" style="flex: 0.815;">
          联系电话:
        </div><div class="content">
          {{ info.contactMode }}
        </div>
      </div>
      <div
        class="info-list"
        style="width: 100%;"
      >
        <div class="label" style="flex: 0.815;">
          申请时间:
        </div><div class="content">
          {{ info.appliedDate }}
        </div>
      </div>
    </div>
    <div class="icon-title">
      <span class="span" /> 附件信息
    </div>
    <common-table
      style="margin-bottom: 20px;"
      :table-data="info.enclosureInfo"
      show-download
    />
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
          label="受理编号:"
          style="width: 100%;"
          prop="reviewedCode"
        >
          <el-input
            v-model.trim="ruleForm.reviewedCode"
            disabled
          />
        </el-form-item>
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
          label="审核时间:"
          style="width: 100%;"
          prop="reviewedDate"
        >
          <el-date-picker
            v-model="ruleForm.reviewedDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择审核时间"
          />
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
        <el-descriptions-item label="审核编号" :span="3">{{ info.reviewedCode }}</el-descriptions-item>
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
import upload from '@/components/upload'
import { getInfo, reviewData } from '@/api/water-transportation-services/keep-on-record/wt-auxiliary-opening-filing'
import CommonTable from '@/components/features/FileTable.vue'
import { momentDate } from '@/utils/index'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      info: {},
      ruleForm: {
        id: '',
        isStatus: '',
        reviewedBy: '',
        reviewedDate: '',
        reviewedOpinion: ''
      },
      rules: {
        isStatus: [
          { required: true, message: '请选择备案审核', trigger: 'change' }
        ],
        reviewedDate: [
          { required: true, message: '请选择审核时间', trigger: 'change' }
        ]
      },
      reviewedFile: [],
      isEdit: false,
      loading: false,
      shipTypeList: [
        { key: 1, val: '港口企业' },
        { key: 2, val: '港口服务企业' },
        { key: 3, val: '水路运输企业' },
        { key: 4, val: '水路运输代理企业' },
        { key: 5, val: '船舶管理企业' },
        { key: 6, val: '其他企业' }
      ]
    }
  },
  async mounted() {
    this.ruleForm.reviewedBy = this.$store.getters.user_info.username
    this.ruleForm.reviewedCode = `FZ${Date.now()}`
    this.isEdit = this.$route.query.isEdit
    this.ruleForm.id = this.$route.query.id
    // 查询详情
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
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
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 30%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
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
