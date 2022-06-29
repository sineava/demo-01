<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="新增代理企业开业备案" />
      </span>
    </div>
    <div class="icon-title">
      <span class="span" /> 基本资料
    </div>
    <el-row :gutter="20">
      <el-form
        ref="ruleForm"
        size="medium"
        label-position="top"
        :model="ruleForm"
        :rules="rules"
      >
        <el-col :span="12">
          <el-form-item label="企业名称:">
            <el-input
              v-model="ruleForm.enterpriseName"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="营业执照编号:"
            prop="businessLicenseNo"
          >
            <el-input v-model.trim="ruleForm.businessLicenseNo" placeholder="请输入营业执照编号" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="行政区划:"
            prop="administrativeDivision"
          >
            <el-input v-model.trim="ruleForm.administrativeDivision" placeholder="请输入行政区划" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业类型:">
            {{ ruleForm.enterpriseType ? shipTypeList[ruleForm.enterpriseType - 1].val : '' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="固定办公场所:"
            prop="officeAddress"
          >
            <el-input v-model.trim="ruleForm.officeAddress" placeholder="请输入固定办公场所" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="法定代表人名称:"
            prop="legalPersonName"
          >
            <el-input v-model.trim="ruleForm.legalPersonName" placeholder="请输入法定代表人名称" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="电话号码:"
            prop="contactPhone"
          >
            <el-input
              v-model="ruleForm.contactPhone"
              maxlength="11"
              placeholder="请输入电话号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="法人身份证号:"
            prop="legalPersonCardNo"
          >
            <el-input v-model.trim="ruleForm.legalPersonCardNo" maxlength="18" placeholder="请输入法人身份证号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="传真:"
            prop="faxNumber"
          >
            <el-input v-model.trim="ruleForm.faxNumber" placeholder="请输入传真" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="经济类型:"
            prop="economicType"
          >
            <el-input v-model.trim="ruleForm.economicType" placeholder="请输入经济类型" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="注册资本:"
            prop="registeredCapital"
          >
            <el-input v-model.trim="ruleForm.registeredCapital" placeholder="请输入注册资本" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="企业注册地址:"
            prop="fixedOfficeSpace"
          >
            <el-input v-model.trim="ruleForm.fixedOfficeSpace" placeholder="请输入企业注册地址" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="电子邮箱:"
            prop="email"
          >
            <el-input v-model.trim="ruleForm.email" placeholder="请输入电子邮箱" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人:"
            prop="contactName"
          >
            <el-input v-model.trim="ruleForm.contactName" placeholder="请输入联系人" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="经营范围:"
            style="width: 100%;"
            prop="allowedBusiness"
          >
            <el-input
              v-model="ruleForm.allowedBusiness"
              type="textarea"
              :rows="6"
              placeholder="请输入经营范围"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <div class="icon-title">
          <span class="span" /> 备案申请信息
        </div>
        <el-col :span="24">
          <el-form-item
            label="申请业务种类:"
            prop="appliedBusinessType"
            style="width: 100%;"
          >
            <el-radio-group v-model="ruleForm.appliedBusinessType">
              <el-radio :label="1">
                水路旅客运输代理
              </el-radio>
              <el-radio :label="2">
                水路货物运输代理
              </el-radio>
              <el-radio :label="3">
                船舶代理
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="申请理由:"
            style="width: 100%;"
            prop="appliedReasons"
          >
            <el-input
              v-model="ruleForm.appliedReasons"
              type="textarea"
              :rows="6"
              placeholder="请输入申请理由"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="联系人:"
            prop="contactPerson"
          >
            <el-input v-model.trim="ruleForm.contactPerson" placeholder="请输入联系人" maxlength="50" />
          </el-form-item>
          <el-form-item
            label="联系电话:"
            prop="contactMode"
          >
            <el-input
              v-model="ruleForm.contactMode"
              maxlength="11"
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="申请时间:"
            prop="appliedDate"
          >
            <el-date-picker
              v-model="ruleForm.appliedDate"
              style="width: 100%;"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择申请时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="附件信息:"
            style="width: 100%;"
          >
            <upload
              style="width: 100%;"
              file
              :show-file-list="false"
              :limit="9"
              multiple
              @fileSuccess="uploadSuccess"
            />
          </el-form-item>
        </el-col>
        <common-table
          :table-data="enclosureInfo"
          show-download
          show-delete
          @handleDelete="handleDelete"
        />
      </el-form>
    </el-row>
    <div
      v-if="info.isStatus === 3"
      style="margin-top: 20px;"
    >
      <div class="icon-title">
        <span class="span" /> 审核信息
      </div>
      <div class="list-column-wrap">
        <div class="info-list">
          <div class="label">
            审核状态：
          </div><div class="content">
            {{ info.isStatus===1?'审核中':(info.isStatus===2?'退回':'已审核') }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核人：
          </div><div class="content">
            {{ info.reviewedBy }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核时间：
          </div><div class="content">
            {{ info.reviewedDate }}
          </div>
        </div>
        <div class="info-list">
          <div class="label">
            审核编号：
          </div><div class="content">
            {{ info.reviewedCode }}
          </div>
        </div>
        <div class="info-list">
          <div class="label" /><div class="content" />
        </div>
        <div class="info-list">
          <div class="label" /><div class="content" />
        </div>
        <div
          class="info-list"
          style="width: 100%;"
        >
          <div class="label">
            审核意见：
          </div><div class="content">
            {{ info.reviewedOpinion }}
          </div>
        </div>
      </div>
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
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/wt-auxiliary-opening-filing'
import { getEnWaterAgentInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { momentDate } from '@/utils/index'
import CommonTable from '@/components/features/FileTable.vue'
import { telephone, identity, fax } from '@/utils/validate'
export default {
  components: {
    upload,
    CommonTable
  },
  data() {
    return {
      ruleForm: {
        administrativeDivision: '',
        contactName: '',
        contactPhone: '',
        economicType: '',
        email: '',
        enterpriseName: '',
        enterpriseType: '',
        faxNumber: '',
        legalPersonCardNo: '',
        legalPersonName: '',
        officeAddress: '',
        organizationId: '',
        organizationName: '',
        businessLicenseNo: '',
        enterpriseId: '',
        registeredCapital: '',
        fixedOfficeSpace: '',
        allowedBusiness:''
      },
      rules: {
        businessLicenseNo: [
          { required: true, message: '请输入营业执照编号', trigger: 'blur' }
        ],
        administrativeDivision: [
          { required: true, message: '请输入行政区划', trigger: 'blur' }
        ],
        officeAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { trigger: 'blur', validator: telephone }
        ],
        legalPersonCardNo: [
          { required: true, message: '请输入法人身份证号码', trigger: 'blur' },
          { validator: identity, trigger: 'blur' }
        ],
        faxNumber: [
          { message: '请输入传真号码', trigger: 'blur', validator: fax }
        ],
        economicType: [
          { required: true, message: '请输入经济类型', trigger: 'blur' }
        ],
        registeredCapital: [
          { required: true, message: '请输入注册资本', trigger: 'blur' }
        ],
        fixedOfficeSpace: [
          { required: true, message: '请输入固定办公场所', trigger: 'blur' }
        ],
        allowedBusiness: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        appliedBusinessType: [
          { required: true, message: '请选择申请业务种类', trigger: 'change' }
        ],
        appliedReasons: [
          { required: true, message: '请输入申请理由', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入企业信息联系人', trigger: 'blur' }
        ],
        contactPerson: [
          { required: true, message: '请输入备案信息联系人', trigger: 'blur' }
        ],
        contactMode: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        appliedDate: [
          { required: true, message: '请选择申请时间', trigger: 'blur' }
        ]
      },
      enterpriseInfo: {},
      loading: false,
      info: {},
      enclosureInfo: [],
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
    // 查询详情
    if (this.$route.query.id) { // 存在id通过id查详情
      this.id = this.$route.query.id
      let info = await getInfo(this.$route.query.id)
      try {
        info.data.enclosureInfo = JSON.parse(info.data.enclosureInfo)
        info.data.reviewedFile = JSON.parse(info.data.reviewedFile)
      } catch (e) {
        console.log()
      }
      this.info = info.data
      this.enclosureInfo = info.data.enclosureInfo
      this.ruleForm = { ...info.data }
      delete this.ruleForm.isStatus
      delete this.ruleForm.reviewedCode
      delete this.ruleForm.reviewedDate
      delete this.ruleForm.reviewedFile
      delete this.ruleForm.reviewedOpinion
      delete this.ruleForm.reviewedBy
    } else { // 查询水陆运输企业基础信息
      const res = (await getEnWaterAgentInfo()).data

      this.ruleForm = {
        administrativeDivision: res.administrativeDivision,
        contactName: res.contactName,
        contactPhone: res.contactPhone,
        economicType: res.economicType,
        email: res.email,
        enterpriseName: res.enterpriseName,
        enterpriseType: res.enterpriseType,
        faxNumber: res.faxNumber,
        legalPersonCardNo: res.legalPersonCardNo,
        legalPersonName: res.legalPersonName,
        officeAddress: res.officeAddress,
        organizationId: res.organizationId,
        organizationName: res.organizationName,

        businessLicenseNo: res.enterpriseBusinessInfoVo.certificateNo,
        enterpriseId: res.id,
        registeredCapital: res.enterpriseBusinessInfoVo.registeredCapital,
        fixedOfficeSpace: res.enterpriseBusinessInfoVo.officeAddress,
        allowedBusiness:res.enterpriseBusinessInfoVo.allowedBusiness
      }
    }
  },
  methods: {
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.enclosureInfo.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.enclosureInfo.splice(val.index, 1)
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
    async save() {
      let data = { ...this.ruleForm }
      data.enclosureInfo = JSON.stringify(this.enclosureInfo)
      this.loading = true
      let res = this.ruleForm.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    },
    returnBack() {
      this.$router.push({ path: '/record/water/water_agent_info' })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 5%;

    .el-form-item {
        width: 40%;

        .el-select {
            width: 100%;
        }
    }
}

/deep/ .clearfix {
    display: flex;

    .tab-wrap {
        margin-left: 50px;
    }
}
</style>
