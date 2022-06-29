<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>提交安全现状评价报告备案</span>
    </div>
    <div class="basic-detail">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="200px"
        size="medium"
        class="table-column three"
      >
        <el-form-item
          label="所在地市港口管理部门:"
          prop="organizationName"
        >
          <el-input v-model.trim="ruleForm.organizationName" />
        </el-form-item>
        <el-form-item
          label="港口企业名称:"
          prop="enterpriseName"
        >
          <el-input v-model.trim="ruleForm.enterpriseName" />
        </el-form-item>
        <el-form-item
          label="安全现状评价报告名称:"
          prop="reportName"
        >
          <el-input v-model.trim="ruleForm.reportName" />
        </el-form-item>
        <el-form-item
          label="评价日期:"
          prop="evaluateDate"
        >
          <el-date-picker
            v-model="ruleForm.evaluateDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="评价机构名称:"
          prop="evaluateOrganizationName"
        >
          <el-input v-model.trim="ruleForm.evaluateOrganizationName" />
        </el-form-item>
        <el-form-item
          label="备案日期:"
          prop="filingDate"
        >
          <el-date-picker
            v-model="ruleForm.filingDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item
          label="备案表:"
          prop="filingTable"
        >
          <el-input v-model.trim="ruleForm.filingTable" />
        </el-form-item>
        <el-form-item
          label="联系人:"
          prop="contactsName"
        >
          <el-input v-model.trim="ruleForm.contactsName" />
        </el-form-item>
        <el-form-item
          label="联系电话:"
          prop="contactsPhone"
        >
          <el-input v-model.trim="ruleForm.contactsPhone" />
        </el-form-item>
        <el-form-item
          label="安全评价报告文件:"
          prop="evaluateEnclosure"
          label-width="200"
          style="width: 100%;"
        >
          <el-button
            v-show="evaluateEnclosureLoading"
            type="primary"
            :loading="true"
          >
            上传中
          </el-button>
          <upload
            v-show="!evaluateEnclosureLoading"
            file
            :show-file-list="false"
            :file-list="ruleForm.evaluateEnclosure"
            payload="evaluateEnclosure"
            multiple
            @beforeUpload="beforeUpload"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.evaluateEnclosure"
            payload="evaluateEnclosure"
            :show-delete="true"
            @handleDelete="handleDelete"
          />
        </el-form-item>
        <el-form-item
          label="整改认定书:"
          prop="rectifyEnclosure"
          label-width="200"
          style="width: 100%;"
        >
          <el-button
            v-show="rectifyEnclosureLoading"
            type="primary"
            :loading="true"
          >
            上传中
          </el-button>
          <upload
            v-show="!rectifyEnclosureLoading"
            file
            :show-file-list="false"
            :file-list="ruleForm.rectifyEnclosure"
            payload="rectifyEnclosure"
            multiple
            @beforeUpload="beforeUpload"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.rectifyEnclosure"
            payload="rectifyEnclosure"
            :show-delete="true"
            @handleDelete="handleDelete"
          />
        </el-form-item>
        <el-form-item
          label="附件:"
          prop="enclosureInfo"
          label-width="200"
          style="width: 100%;"
        >
          <el-button
            v-show="enclosureInfoLoading"
            type="primary"
            :loading="true"
          >
            上传中
          </el-button>
          <upload
            v-show="!enclosureInfoLoading"
            file
            :show-file-list="false"
            :file-list="ruleForm.enclosure"
            payload="enclosure"
            multiple
            @beforeUpload="beforeUpload"
            @fileSuccess="uploadSuccess"
          />
        </el-form-item>
        <el-form-item
          label-width="0"
          style="width: 100%;"
        >
          <commonTable
            :table-data="ruleForm.enclosureInfo"
            payload="enclosureInfo"
            :show-delete="true"
            @handleDelete="handleDelete"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
        @click="review('ruleForm')"
      >
        提交审核
      </el-button>
      <el-button
        plain
        size="medium"
        @click="returnBack"
      >
        关闭
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { telephone } from '@/utils/validate'
import upload from '@/components/upload'
import { momentDate } from '@/utils/index'
import commonTable from '../../commonTable'
export default {
  components: {
    upload,
    commonTable
  },
  data() {
    return {
      // loading
      evaluateEnclosureLoading: false,
      rectifyEnclosureLoading: false,
      enclosureLoading: false,
      ruleForm: {
        contactsName: '',
        contactsPhone: '',
        enterpriseId: '',
        enterpriseName: '',
        evaluateDate: '',
        evaluateEnclosure: [], // 安全评价报告文件
        evaluateOrganizationName: '',
        filingDate: '',
        filingForm: 0,
        filingTable: '',
        id: 0,
        organizationId: '',
        organizationName: '',
        rectifyEnclosure: [], // 整改认定书
        reportName: '',
        enclosureInfo: [] // 附件
      },
      rules: {
        enterpriseName: [
          { required: true, message: '请输入港口企业名称', trigger: 'blur' }
        ],
        reportName: [
          { required: true, message: '请输入安全现状评估报告名称', trigger: 'blur' }
        ],
        evaluateDate: [
          { required: true, message: '请选择评价日期', trigger: 'blur' }
        ],
        evaluateOrganizationName: [
          { required: true, message: '请输入评价机构名称', trigger: 'blur' }
        ],
        filingDate: [
          { required: true, message: '请选择备案日期', trigger: 'blur' }
        ],
        filingTable: [
          { required: true, message: '请输入备案表', trigger: 'blur' }
        ],
        contactsName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        evaluateEnclosure: [
          { required: true, message: '请选择安全评价报告文件', trigger: 'blur' }
        ],
        rectifyEnclosure: [
          { required: true, message: '请选择整改认定书', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 文件上传前
    beforeUpload(_, { payload }) {
      if (payload === 'evaluateEnclosure') this.evaluateEnclosureLoading = true
      if (payload === 'rectifyEnclosure') this.rectifyEnclosureLoading = true
      if (payload === 'enclosureInfo') this.enclosureInfoLoading = true
    },
    // 文件上传成功时的钩子
    uploadSuccess(file, payload) {
      let list = null
      if (payload === 'evaluateEnclosure') {
        list = this.ruleForm.evaluateEnclosure
        this.evaluateEnclosureLoading = false
      }
      if (payload === 'rectifyEnclosure') {
        list = this.ruleForm.rectifyEnclosure
        this.rectifyEnclosureLoading = false
      }
      if (payload === 'enclosureInfo') {
        list = this.ruleForm.enclosure
        this.enclosureInfoLoading = false
      }
      list.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 移除表格数据
    handleDelete({ payload, index }) {
      let list = null
      if (payload === 'evaluateEnclosure') list = this.ruleForm.evaluateEnclosure
      if (payload === 'rectifyEnclosure') list = this.ruleForm.rectifyEnclosure
      if (payload === 'enclosureInfo') list = this.ruleForm.enclosureInfo
      list.splice(index, 1)
    },
    // 提交审核
    review(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {

          return false
        }
      })
    },
    // 保存数据
    async saveData() {
      const safetyReportFilingInfoDto = {
        ...this.ruleForm,
        evaluateDate: momentDate(this.ruleForm.evaluateDate),
        evaluateEnclosure: JSON.stringify(this.ruleForm.evaluateEnclosure),
        filingDate: JSON.stringify(this.ruleForm.filingDate),
        filingForm: 1, // 新增默认1
        id: 0, // 新增默认0
        rectifyEnclosure: JSON.stringify(this.ruleForm.rectifyEnclosure),
        enclosureInfo: JSON.stringify(this.ruleForm.enclosureInfo)
      }
      return safetyReportFilingInfoDto
    },
    // 返回
    returnBack() {
      this.$router.push({ path: '/reportfiling/safe/status' })
    }
  }
}
</script>
